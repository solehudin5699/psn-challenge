'use client';

import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import ModalAddComment from '@/components/modals/ModalAddComment';
import { useCreateComment, useDeleteComment, useListComments } from '@/hooks/useServices';
import { IBodyComment, IResponseListComments } from '@/services/types';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

export default function Home() {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [isShowModal, setShowModal] = useState(false);
  const [comments, setComments] = useState<IResponseListComments['data']>([]);
  const { data } = useListComments();
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const toast = useRef<Toast>(null);

  const handleTost = (msg: string, type: 'success' | 'error' = 'success') => {
    toast?.current?.show({ severity: type, summary: <p>{type}</p>, detail: msg, life: 3000 });
  };

  const handleAddComment = (values: IBodyComment) => {
    createComment.mutate(values, {
      onSuccess: (data) => {
        handleTost('Successfully added');
        setComments([data.data, ...comments]);
        setShowModal(false);
      },
      onError: (_error) => {
        handleTost('Failed to add', 'error');
      },
    });
  };

  const handleConfirmComment = (id: number) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => handleDeleteComment(id),
    });
  };

  const handleDeleteComment = (id: number) => {
    deleteComment.mutateAsync(id, {
      onSuccess: () => {
        handleTost('Successfully deleted');
        setComments(comments.filter((comment) => comment.id !== id));
      },
      onError: (_error) => {
        handleTost('Failed to delete', 'error');
      },
    });
  };

  useEffect(() => {
    if (data?.data) {
      setComments(data?.data);
    }
  }, [data]);

  const [filters, setFilters] = useState<Record<string, any>>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    description: { value: null, matchMode: FilterMatchMode.IN },
  });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between flex-col md:flex-row gap-3">
        <IconField iconPosition="left" className="">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="w-full md:w-auto"
          />
        </IconField>
        <Button onClick={() => setShowModal(true)}>Add Comment</Button>
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Card title="List Comments" className="w-full shadow-2xl">
        <DataTable
          value={comments}
          tableStyle={{ minWidth: '50rem' }}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          filters={filters}
          header={renderHeader()}
          onFilter={(e) => setFilters(e.filters)}
          loading={deleteComment.isPending}
          loadingIcon="pi pi-spin pi-spinner"
        >
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="body" header="Body" />
          <Column
            header="Action"
            body={(row) => (
              <div className="flex items-center">
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger"
                  label="Delete"
                  onClick={() => handleConfirmComment(row.id)}
                />
              </div>
            )}
          />
        </DataTable>
      </Card>
      <ModalAddComment
        isOpen={isShowModal}
        onClose={() => {
          setShowModal(false);
        }}
        onSubmit={handleAddComment}
        isLoading={createComment.isPending}
      />
    </>
  );
}
