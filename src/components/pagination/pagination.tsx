import React from 'react';
import './pagination.css';
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";


type PaginationProps = {
    count: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ count, currentPage, itemsPerPage, onPageChange }) => {
    const getPaginationRange = (currentPage: number, totalPages: number): (number | "...")[] => {
        const range: (number | "...")[] = [];
        const maxVisiblePages = 5;
      
        if (totalPages <= maxVisiblePages) {
          for (let i = 1; i <= totalPages; i++) {
            range.push(i);
          }
        } else {
          range.push(1);
      
          if (currentPage > 3) {
            range.push("...");
          }
      
          const startPage = Math.max(2, currentPage - 1);
          const endPage = Math.min(totalPages - 1, currentPage + 1);
      
          for (let i = startPage; i <= endPage; i++) {
            range.push(i);
          }
      
          if (currentPage < totalPages - 2) {
            range.push("...");
          }
      
          range.push(totalPages);
        }
      
        return range;
      };
      






    const totalPages = Math.ceil(count / itemsPerPage);


    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        // <div className='row mt-4 mb-4 mr-2 ml-2'>
        //     <div className='col-4'>
        //         <button className='left_p'
        //             disabled={currentPage === 1}
        //             onClick={() => onPageChange(currentPage - 1)}
        //         >
        //            <span className='icon_ex'><BsArrowLeft /></span> Previous
        //         </button>
        //     </div>
        //     <div className='col-4 page_c'>
        //         {pageNumbers.map((pageNum) => (
        //             <button className='center_p'
        //                 key={pageNum}
        //                 onClick={() => onPageChange(pageNum)}
        //                 disabled={currentPage === pageNum}
        //             >
        //                 {pageNum}
        //             </button>
        //         ))}
        //     </div>
        //     <div className='col-4'>
        //         <button className='right_p'
        //             disabled={currentPage === totalPages}
        //             onClick={() => onPageChange(currentPage + 1)}
        //         >
        //             Next <span className='icon_ex'><BsArrowRight /></span>
        //         </button>
        //     </div>



        // </div>
        

        <div className='row mt-4 mb-4 mr-2 ml-2'>
  <div className='col-3'>
    <button
      className='left_p'
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      <span className='icon_ex'><BsArrowLeft /></span> Previous
    </button>
  </div>
  <div className='col-6 page_c'>
    {getPaginationRange(currentPage, totalPages).map((pageNum, index) =>
      pageNum === "..." ? (
        <span key={`dots-${index}`} className="dots">...</span> // Unique key for dots
      ) : (
        <button
          className='center_p'
          key={`page-${pageNum}`} // Unique key for page numbers
          onClick={() => onPageChange(pageNum)}
          disabled={currentPage === pageNum}
        >
          {pageNum}
        </button>
      )
    )}
  </div>
  <div className='col-3'>
    <button
      className='right_p'
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next <span className='icon_ex'><BsArrowRight /></span>
    </button>
  </div>
</div>





    );
};

export default Pagination;
