import { injectable, container } from "tsyringe";
import { toast } from "react-toastify";
import type { ProblemDetails } from "@/api/query";
import axios from "axios";

export interface IErrorHandler {
  handle(error: unknown): boolean;
}

export const ERROR_HANDLER_TOKEN = Symbol("ERROR_HANDLER_TOKEN");

@injectable()
class NormalErrorHandler implements IErrorHandler {
  handle(error: unknown): boolean {
    if (error instanceof Error) {
      toast.error(error.message);
      console.error(error);
      return true;
    }
    return false;
  }
}

@injectable()
class ProblemDetailsErrorHandler implements IErrorHandler {
  handle(error: unknown): boolean {
    const data = getProblemDetailsFromError(error);
    if (data) {
      toast.error(data.detail || "未知错误");
      console.error(data);
      return true;
    }
    return false;
  }
}

function getProblemDetailsFromError(error: unknown): ProblemDetails | null {
  if (!axios.isAxiosError(error)) return null;

  const data = error.response?.data;
  // 通过 Content-Type  application/problem+json  判断是否为 ProblemDetails 格式的响应
  const ct = error.response?.headers?.["content-type"];
  if (typeof ct === "string" && !ct.includes("application/problem+json"))
    return null;

  return data as ProblemDetails;
}

// 注册错误处理器，后续可以通过 container.resolveAll<IErrorHandler>(ERROR_HANDLER_TOKEN) 获取所有注册的错误处理器
export function registerErrorHandlers() {
  container.register<IErrorHandler>(ERROR_HANDLER_TOKEN, {
    useClass: ProblemDetailsErrorHandler,
  });
  container.register<IErrorHandler>(ERROR_HANDLER_TOKEN, {
    useClass: NormalErrorHandler,
  });
}

/**
 * 统一错误处理函数，依次调用注册的错误处理器，直到有一个处理器返回 true 表示已处理
 * @returns
 */
export function errorHandle(error: unknown) {
  const handlers = container.resolveAll<IErrorHandler>(ERROR_HANDLER_TOKEN);
  for (const handler of handlers) {
    if (handler.handle(error)) return true;
  }
  return false;
}
