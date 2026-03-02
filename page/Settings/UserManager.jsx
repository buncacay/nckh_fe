import React, { useState } from "react";
import DynamicTable from "../../components/dynamicTable";

import {
  ArrowUpDown,
  Filter,
  Search
} from "lucide-react";


const UserManager = () => {

  const [page, setPage] = useState(1);
  const [totalPages] = useState(5);


  const recentActivities = [

    {
      id: 1,
      signerName: "Alice Johnson",
      copyIssueDate: "20/02/2026",
      holderName: "Nguyen Van A",
      diplomaSerial: "B123456",
      copyQuantity: 2
    },

    {
      id: 2,
      signerName: "Robert Chen",
      copyIssueDate: "19/02/2026",
      holderName: "Tran Thi B",
      diplomaSerial: "C789012",
      copyQuantity: 1
    }

  ];


  const columns = [

    {
      header: "Người ký & Ngày cấp",

      render: (row) => (

        <div>

          <div className="
            font-bold
            text-slate-700
            text-sm
          ">
            {row.signerName}
          </div>


          <div className="
            text-[11px]
            text-slate-400
            italic
          ">
            {row.copyIssueDate}
          </div>

        </div>

      )
    },


    {
      header: "Người được cấp",
      key: "holderName"
    },


    {
      header: "Số hiệu bằng",
      key: "diplomaSerial"
    },


    {
      header: "Số lượng",

      render: (row) => (

        <span className="
          px-3 py-1
          bg-blue-50
          text-blue-600
          rounded-lg
          text-xs
          font-bold
          border
          border-blue-100
        ">

          {row.copyQuantity} bản

        </span>

      )
    }

  ];


  const handlePageChange = (pageIndex) => {

    setPage(pageIndex);

    console.log("Load Faculty page:", pageIndex);

    // gọi API ở đây nếu cần

  };


  return (

    <div className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
    ">


      {/* HEADER */}

      <div className="
          p-6
          border-b
          border-slate-100
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
      ">


        <h3 className="
            text-lg
            font-bold
            text-blue-900
        ">

          Thông tin chi tiết

        </h3>



        <div className="
            flex
            flex-wrap
            gap-3
            w-full
            justify-end
        ">


          {/* SEARCH */}

          <div className="
              relative
              group
          ">

            <Search
              size={16}
              className="
                absolute
                left-3
                top-2.5
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Tìm tên, ID..."

              className="
                w-56
                bg-slate-50
                border
                border-slate-200
                text-xs
                rounded-xl
                py-2
                pl-10
                pr-4
                outline-none
                focus:bg-white
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-50
              "
            />

          </div>



          {/* FILTER */}

          <div className="
              flex
              items-center
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-3
              py-1.5
          ">

            <Filter size={14} />

            <select className="ml-2 text-xs outline-none">

              <option>Loại</option>
              <option>Văn bằng</option>
              <option>Phụ lục</option>
              <option>Bản sao</option>

            </select>

          </div>



          {/* SORT */}

          <div className="
              flex
              items-center
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-3
              py-1.5
          ">

            <ArrowUpDown size={14} />

            <select className="ml-2 text-xs outline-none">

              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Tên A-Z</option>
              <option>Tên Z-A</option>

            </select>

          </div>


        </div>


      </div>



      {/* TABLE */}

      <div className="p-6 pt-4">


        <DynamicTable

          columns={columns}

          data={recentActivities}

          currentPage={page}

          totalPages={totalPages}

          onPageChange={handlePageChange}
          onRowClickPath={(row) => `/student`}
          // onRowClickPath={(row) => `/student/${row.id}`}

        />


      </div>


    </div>

  );

};


export default UserManager;