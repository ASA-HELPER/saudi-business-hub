import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddShareholderModal from "./AddShareholderModal";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import businessActivityLogo from "../../assets/images/investment/business/empty_state_icon.svg";
import SectionTitle from "../../components/common/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchShareholdersRequest } from "../../store/actions/shareHolderListAction";
import {
  selectShareholderError,
  selectShareholderList,
  selectShareholderLoading,
} from "../../store/selectors/shareHolderSelector";
import { useTranslation } from "react-i18next";
import { deleteShareholderRequest } from "../../store/actions/shareholderDeleteActions";
import { selectDeletedShareholderIds } from "../../store/selectors/shareholderDeleteSelectors";
import BaseConfirmationModal from "../../components/generic/Modal/BaseConfirmationModal";
const PageWrapper = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #161616;
`;

const Note = styled.div`
  background: #edf3f2;
  color: #161616;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-right: 16px;
  font-weight: 400;
`;

const AddButton = styled.button`
  background-color: #00778e;
  color: #fff;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005f70;
  }
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  margin: 16px 0;
  background: linear-gradient(
    to right,
    #9333ea 0%,
    #9333ea 120px,
    #d1d5db 120px,
    #d1d5db 100%
  );
`;

const EmptyState = styled.div<{ isRTL?: boolean }>`
  text-align: center;
  padding: 40px;
  flex-direction: ${({ isRTL }) => (isRTL ? "column-reverse" : "column")};
  display: flex;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const EmptyText = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
`;

const Th = styled.th<{ isRTL?: boolean }>`
  text-align: ${({ isRTL }) => (isRTL ? "right" : "left")};
  padding: 12px;
  background: #f1f5f9;
  color: #333;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  color: black;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ color: string }>`
  border: none;
  background: ${({ color }) => color};
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
`;

const ActionImage = styled.img`
  width: 32px;
  height: 32px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionHeaderWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 24px;
`;


interface Shareholder {
  id: number;
  name: string;
  type: string;
  percentage: string;
  nationality: string;
  legalStatus: string;
}

const ShareholderStep: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedShareHolderId, setSelectedShareHolderId] = useState(0);
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);
  const [sharePercentage, setSharePercentage] = useState("0");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const shareholderList = useSelector(selectShareholderList);
  const shareholderLoading = useSelector(selectShareholderLoading);
  const shareholderError = useSelector(selectShareholderError);

  const deletedShareholderIds = useSelector(selectDeletedShareholderIds);

  useEffect(() => {
    setShowDeleteModal(false);
    dispatch(fetchShareholdersRequest());
  }, [dispatch, deletedShareholderIds]);

  useEffect(() => {
    console.log(shareholderList);
  }, [shareholderList]);

  const handleEdit = (
    id: number,
    shareHolderId: number,
    sharePercentage: string
  ) => {
    console.log("handleEdit", id, shareHolderId);
    setSelectedCustomerId(id);
    setSelectedShareHolderId(shareHolderId);
    setSharePercentage(sharePercentage);
    setShowModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteShareholderRequest(selectedShareHolderId));
  };

  const handleAddShareholder = () => {
    setShareholders((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "Omar",
        type: t("shareholderTypes.person"),
        percentage: "70%",
        nationality: "Burundi",
        legalStatus: t("legalStatus.restricted"),
      },
    ]);
    setShowModal(false);
    dispatch(fetchShareholdersRequest());
  };

  const totalAllocated = shareholderList?.reduce((sum, s) => {
    const percent =
      typeof s.shares_percentage === "string"
        ? parseFloat(s.shares_percentage.replace("%", ""))
        : Number(s.shares_percentage);
    return sum + (isNaN(percent) ? 0 : percent);
  }, 0);

  const remainingPercentage = Math.max(0, 100 - totalAllocated).toFixed(0);

  return (
    <PageWrapper>
      <Card>
        <SectionHeaderWrapper>
          <HeaderRow>
            <SectionTitle>{t("shareholderList.title")}</SectionTitle>
            {shareholderList?.length !== 0 && (
              <RightActions>
                <Note>
                  {t("shareholderList.note", {
                    percentage: parseInt(remainingPercentage),
                  })}
                </Note>
                <AddButton onClick={() => setShowModal(true)}>
                  {t("shareholderList.addButton")}
                </AddButton>
              </RightActions>
            )}
          </HeaderRow>
          {/* <SectionUnderline /> */}
        </SectionHeaderWrapper>

        {shareholderList?.length === 0 ? (
          <EmptyState isRTL={false}>
            <Icon>
              <img
                src={businessActivityLogo}
                alt={t("altText.businessActivityLogo")}
              />
            </Icon>
            <EmptyText>
              {t("shareholderList.emptyState.title")}
              <br />
              {t("shareholderList.emptyState.subtitle")}
            </EmptyText>
            <AddButton onClick={() => setShowModal(true)}>
              {t("shareholderList.addButton")}
            </AddButton>
          </EmptyState>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th isRTL={false}>{t("shareholderList.tableHeaders.id")}</Th>
                  <Th isRTL={false}>
                    {t("shareholderList.tableHeaders.name")}
                  </Th>
                  <Th isRTL={false}>
                    {t("shareholderList.tableHeaders.type")}
                  </Th>
                  <Th isRTL={false}>
                    {t("shareholderList.tableHeaders.percentage")}
                  </Th>
                  <Th isRTL={false}>
                    {t("shareholderList.tableHeaders.actions")}
                  </Th>
                </tr>
              </thead>
              <tbody>
                {shareholderList?.map((s, index) => (
                  <tr key={s.id}>
                    <Td>{s?.id}</Td>
                    <Td>{s?.full_name}</Td>
                    <Td>{s?.type}</Td>
                    <Td>{s.shares_percentage}</Td>
                    <Td>
                      <Actions>
                        <ActionImage
                          src={editIcon}
                          alt={t("actions.edit")}
                          onClick={() =>
                            handleEdit(s.customer_id, s.id, s.shares_percentage)
                          }
                        />
                        <ActionImage
                          src={deleteIcon}
                          alt={t("actions.delete")}
                          onClick={() => {
                            setSelectedShareHolderId(s.id);
                            setShowDeleteModal(true);
                          }}
                        />
                      </Actions>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card>

      {showModal && (
        <AddShareholderModal
          isOpen={true}
          onClose={handleAddShareholder}
          shareHolderId={selectedShareHolderId}
          customerId={selectedCustomerId}
          sharePercentage={sharePercentage}
        />
      )}

      <BaseConfirmationModal
        isOpen={showDeleteModal}
        icon={deleteIcon}
        iconAlt={t("preview.contactdetail.delete")}
        title={"Are you sure want to delete?"}
        yesLabel={"Yes"}
        noLabel={"Cancel"}
        onYes={() => handleDelete()}
        onNo={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      />
    </PageWrapper>
  );
};

export default ShareholderStep;
