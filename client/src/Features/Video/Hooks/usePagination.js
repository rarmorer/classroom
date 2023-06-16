import {useEffect, useCallback, useState} from 'react';
import { maxViewportVideoCounts } from './videoLayoutHelper';
import { useMount } from './useMount';

const MAX_PERPAGE = 9;

export const usePagination = (client, dimension) => {
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [pageSize, setPageSize] = useState(MAX_PERPAGE);

  useEffect(() => {
    const size = Math.min(MAX_PERPAGE, maxViewportVideoCounts(dimension.width, dimension.height));
    setPageSize(size);
  }, [dimension]);
  const onParticipantsChange = useCallback(() => {
    setTotalSize(client.getAllUser().length)
  }, [client]);
  useEffect(() => {
    client.on('user-added', onParticipantsChange);
    client.on('user-removed', onParticipantsChange);
    client.on('user-updated', onParticipantsChange);
    return () => {
    client.off('user-added', onParticipantsChange);
    client.off('user-removed', onParticipantsChange);
    client.off('user-updated', onParticipantsChange);
    };
},[client, onParticipantsChange]);
  useMount(() => {
    setTotalSize(client.getAllUser().length)
  });
  return {
    page, totalPage: Math.ceil(totalSize / pageSize), pageSize, totalSize, setPage
  }
}