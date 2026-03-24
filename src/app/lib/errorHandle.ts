import { injectable, container } from "tsyringe";
import { toast } from "react-toastify";
import type { ProblemDetails } from "@/api/query";

export interface IErrorHandler {
  handle(error: unknown): boolean;
}

export const ERROR_HANDLER_TOKEN = Symbol("ERROR_HANDLER_TOKEN");

@injectable()
class NormalErrorHandler implements IErrorHandler {
  handle(error: unknown): boolean {
    if (error instanceof Error) {
      toast.error(error.message);
      return true;
    }
    return false;
  }
}

@injectable()
class ProblemDetailsErrorHandler implements IErrorHandler {
  handle(error: unknown): boolean {
    const data = (error as any)?.response?.data as ProblemDetails | undefined;
    if (data) {
      toast.error(data.detail || "未知错误");
      return true;
    }
    return false;
  }
}

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
export function errorHandle(error: unknown, fallback?: () => void) {
  const handlers = container.resolveAll<IErrorHandler>(ERROR_HANDLER_TOKEN);
  for (const handler of handlers) {
    if (handler.handle(error)) return;
  }
  fallback?.();
}
