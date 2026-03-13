//使用策略模式实现分页页码显示的不同策略

interface IPageStrategy {
  getPageNumbers: (PaginationContext: PaginationContext) => (string | number)[];
}

//直接全部显示
class ShowAllPagesStrategy implements IPageStrategy {
  getPageNumbers(PaginationContext: PaginationContext): (string | number)[] {
    return Array.from(
      { length: PaginationContext.TotalPages },
      (_, i) => i + 1
    );
  }
}

//显示首页及附近页码，...,末页
class ShowForegoingAndNearbyPagesStrategy implements IPageStrategy {
  getPageNumbers(PaginationContext: PaginationContext): (string | number)[] {
    const pageNumbers: (string | number)[] = [1];

    for (let i = 2; i <= PaginationContext.PAGE_THRESHOLD + 1; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push("...");
    pageNumbers.push(PaginationContext.TotalPages);
    return pageNumbers;
  }
}

//显示首页 , ... ，当前页附近的页码，...，末页
class ShowFirstNearAndLastPagesStrategy implements IPageStrategy {
  getPageNumbers(PaginationContext: PaginationContext): (string | number)[] {
    const pageNumbers: (string | number)[] = [1, "..."];

    //保证当前页居中显示
    const startPage = Math.max(
      PaginationContext.CurrentPage -
        Math.floor(PaginationContext.PAGE_THRESHOLD / 2),
      2
    );
    const endPage = Math.min(
      PaginationContext.CurrentPage +
        Math.floor(PaginationContext.PAGE_THRESHOLD / 2),
      PaginationContext.TotalPages - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    pageNumbers.push("...", PaginationContext.TotalPages);
    return pageNumbers;
  }
}

//显示 1 ... 和最后的几页页码
class ShowFirstAndLastPagesStrategy implements IPageStrategy {
  getPageNumbers(PaginationContext: PaginationContext): (string | number)[] {
    const pageNumbers = [1, "..."];

    for (
      let i =
        PaginationContext.TotalPages - PaginationContext.PAGE_THRESHOLD + 1;
      i <= PaginationContext.TotalPages;
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}

//用于判断使用哪个策略的上下文类
class PaginationContext {
  private strategy: IPageStrategy;

  /**
   *  最多显示 {MAX_PAGE_DISPLAY} 页，超过则显示省略号
   */
  public MAX_PAGE_DISPLAY = 6;

  /**
   *
   */
  public PAGE_THRESHOLD = 4;

  /**
   * 当前页码
   */
  public CurrentPage: number;

  /**
   * 总页数
   */
  public TotalPages: number;

  constructor(
    currentPage: number,
    totalPages: number,
    PAGE_THRESHOLD?: number,
    maxPageDisplay?: number
  ) {
    this.CurrentPage = currentPage;
    this.TotalPages = totalPages;

    if (currentPage < 1 || currentPage > totalPages)
      throw new Error("currentPage error");

    if (totalPages < 1) throw new Error("totalPages error");

    if (
      PAGE_THRESHOLD !== undefined &&
      (PAGE_THRESHOLD < 1 || PAGE_THRESHOLD >= totalPages)
    )
      throw new Error("PAGE_THRESHOLD error");

    if (maxPageDisplay !== undefined) {
      this.MAX_PAGE_DISPLAY = maxPageDisplay;
    }
    if (PAGE_THRESHOLD !== undefined) {
      this.PAGE_THRESHOLD = PAGE_THRESHOLD;
    }
    if (totalPages <= this.MAX_PAGE_DISPLAY) {
      this.strategy = new ShowAllPagesStrategy();
    } else if (currentPage <= this.PAGE_THRESHOLD) {
      this.strategy = new ShowForegoingAndNearbyPagesStrategy();
    } else if (
      currentPage > this.PAGE_THRESHOLD &&
      currentPage <= totalPages - this.PAGE_THRESHOLD
    ) {
      this.strategy = new ShowFirstNearAndLastPagesStrategy();
    } else {
      this.strategy = new ShowFirstAndLastPagesStrategy();
    }
  }

  /**
   * 获取要显示的页码列表
   * @returns  页码列表，包含数字和省略号字符串
   */
  getPageNumbers(): (string | number)[] {
    return this.strategy.getPageNumbers(this);
  }
}

export { PaginationContext };
