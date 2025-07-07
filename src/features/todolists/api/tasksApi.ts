import { baseApi } from '@/app/baseApi';
import type { BaseResponse } from '@/common/types';
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      providesTags: (res, _err, todolistId) =>
        res
          ? [...res.items.map(({ id }) => ({ type: 'Task', id }) as const), { type: 'Task', id: todolistId }]
          : ['Task'],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: (_res, _err, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi;
