import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
