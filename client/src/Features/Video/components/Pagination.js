import { useCallback } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import './Pagination.scss';

const Pagination = (props) => {
  const {page, totalPage, setPage, inSharing} = props;
  const pageIndication = `${page + 1}/${totalPage}`;
  const toPrevPage = useCallback(() => {
    if (page > 0) {
      setPage(page-1);
    }
  }, [page, setPage]);
  const toNextPage = useCallback(() => {
    if (page < totalPage - 1) {
      setPage(page + 1)
    }
  }, [page, totalPage, setPage]);
  
  return (
    <div className={classnames('pagination', { 'in-sharing': inSharing })}>
      <Button
        key="left"
        className="previous-page-button"
        icon={<CaretLeftOutlined />}
        ghost={true}
        onClick={toPrevPage}
      >
        {pageIndication}
      </Button>
      <Button 
      key="right" 
      className="next-page-button" 
      icon={<CaretRightOutlined />} 
      ghost={true} 
      onClick={toNextPage}
      >
        {pageIndication}
      </Button>
    </div>
  );
};

export default Pagination;