import { FC } from 'react';

import Modal from '@/components/layout/modal';
import ItemContactStatus from '@/components/layout/navbar-items-status/item-contact-status';
import ItemDealStatus from '@/components/layout/navbar-items-status/item-deal-status';
import ItemEmailStatus from '@/components/layout/navbar-items-status/item-email-status';
import ItemTaskStatus from '@/components/layout/navbar-items-status/item-task-status';
import { useTasksDataContext } from '@/context/tasks-context';

type EmailModalProps = {
  buttonName: string;
  toggle: boolean;
  openModal: boolean;
  onClose: () => void;
};

const ItemsModal: FC<EmailModalProps> = ({
  openModal,
  onClose,
  toggle,
  buttonName,
}) => {
  const { setFilter } = useTasksDataContext();

  const modalContentPicker = (contentType: string) => {
    switch (contentType) {
      case 'Tasks':
        return ['All', 'Completed', 'Ended', 'Active'];
      case 'Email':
        return ['Scheduled', 'Sent', 'Archived', 'Draft'];
      case 'Contacts':
        return ['New', 'Top rated', 'Fired'];
      case 'Deals':
        return ['Low', 'High', 'Urgent'];
      default:
        return [];
    }
  };

  const statusComponentPicker = (
    statusComponent: string,
    item: any,
    toggle: boolean
  ) => {
    switch (statusComponent) {
      case 'Tasks':
        return <ItemTaskStatus itemTaskStatuses={item} toggle={toggle} />;
      case 'Email':
        return <ItemEmailStatus itemEmailStatus={item} toggle={toggle} />;
      case 'Contacts':
        return <ItemContactStatus toggle={toggle} itemContactStatus={item} />;
      case 'Deals':
        return <ItemDealStatus toggle={toggle} itemDealStatus={item} />;
    }
  };
  return (
    <div>
      <Modal openModal={openModal} onClose={onClose}>
        <div>
          {modalContentPicker(buttonName).map(item => {
            return (
              <div key={Math.random()}>
                <div key={Math.random()} onClick={() => setFilter(item)}>
                  {statusComponentPicker(buttonName, item, toggle)}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ItemsModal;
