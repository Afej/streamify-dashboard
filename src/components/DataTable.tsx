import React, { useState, useCallback, useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Stream } from '../types'

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50]

const columnHelper = createColumnHelper<Stream>()

const columns = [
  columnHelper.accessor('songName', {
    header: 'Song Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('artist', {
    header: 'Artist',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dateStreamed', {
    header: 'Date Streamed',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor('streamCount', {
    header: 'Stream Count',
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('userId', {
    header: 'User ID',
    cell: (info) => info.getValue(),
  }),
]

const EmptyState = ({ message }: { message: string }) => (
  <tr>
    <td className='px-6 py-12 text-center text-gray-500' colSpan={5}>
      <div className='flex flex-col items-center justify-center space-y-2'>
        <Search className='w-8 h-8 text-gray-400' />
        <p>{message}</p>
      </div>
    </td>
  </tr>
)

interface DataTableProps {
  streams: Stream[]
}

const DataTable: React.FC<DataTableProps> = ({ streams }) => {
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<{
    field: string
    order: 'asc' | 'desc'
  } | null>(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0])

  const filteredData = useMemo(() => {
    let result = [...streams]

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (stream) =>
          stream.songName.toLowerCase().includes(searchLower) ||
          stream.artist.toLowerCase().includes(searchLower)
      )
    }

    if (sorting) {
      result.sort((a, b) => {
        const modifier = sorting.order === 'asc' ? 1 : -1
        return a[sorting.field as keyof Stream] >
          b[sorting.field as keyof Stream]
          ? modifier
          : -modifier
      })
    }

    return result
  }, [streams, search, sorting])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage
    return filteredData.slice(start, start + perPage)
  }, [filteredData, page, perPage])

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setPage(1)
    },
    []
  )

  const totalPages = Math.ceil(filteredData.length / perPage)

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center gap-6'>
        {/* Search */}
        <div className='relative flex-1'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='text'
            value={search}
            onChange={handleSearchChange}
            placeholder='Search songs or artists...'
            className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          />
        </div>

        {/* Items per page selector */}
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-500'>Show:</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value))
              setPage(1)
            }}
            className='border border-gray-300 rounded-md text-sm p-1'>
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto bg-white rounded-lg shadow'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                    onClick={() => {
                      const field = header.column.id
                      setSorting((prev) => ({
                        field,
                        order:
                          prev?.field === field && prev.order === 'asc'
                            ? 'desc'
                            : 'asc',
                      }))
                    }}>
                    <div className='flex items-center space-x-1'>
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {sorting?.field === header.column.id &&
                        (sorting.order === 'asc' ? (
                          <ChevronUp className='w-4 h-4' />
                        ) : (
                          <ChevronDown className='w-4 h-4' />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {paginatedData.length === 0 ? (
              <EmptyState
                message={
                  search
                    ? 'No results found. Try a different search term.'
                    : 'No streams available.'
                }
              />
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='hover:bg-gray-50'>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200 sm:px-6'>
          <div className='flex-1 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div>
              <p className='text-sm text-gray-700'>
                Showing{' '}
                <span className='font-medium'>{(page - 1) * perPage + 1}</span>{' '}
                to{' '}
                <span className='font-medium'>
                  {Math.min(page * perPage, filteredData.length)}
                </span>{' '}
                of <span className='font-medium'>{filteredData.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className='relative z-0 inline-flex flex-wrap rounded-md shadow-sm -space-x-px'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pageNum === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}>
                      {pageNum}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
