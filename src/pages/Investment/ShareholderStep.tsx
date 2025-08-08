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
  background: #EDF3F2;
  color: #161616;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-right: 16px;
  font weight: 400;
`;

const AddButton = styled.button`
  background-color: #00778E;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
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

const Th = styled.th`
  text-align: left;
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

const SectionTitleText = styled.div`
  display: inline-block;
  border-bottom: 2px solid #884699;
  font-size: 20px;
  font-weight: 600;
  color: #161616;
  padding-bottom: 15px;
  position: relative;
  z-index: 1;
  margin-left: -12px;
`;

const SectionUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #884699 0 140px, #d1d5db 140px 100%);
  z-index: 0;
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
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const dispatch = useDispatch();

  const shareholderList = useSelector(selectShareholderList);
  const shareholderLoading = useSelector(selectShareholderLoading);
  const shareholderError = useSelector(selectShareholderError);

  useEffect(() => {
    dispatch(fetchShareholdersRequest());
  }, []);

  useEffect(() => {
    console.log(shareholderList);
  }, [shareholderList]);

  const handleAddShareholder = () => {
    // For now, add a sample shareholder when modal is closed
    setShareholders((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "Omar",
        type: "Person",
        percentage: "70%",
        nationality: "Burundi",
        legalStatus: "Restricted",
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
          <SectionTitleText>Shareholders List</SectionTitleText>
          {shareholderList?.length !== 0 && (
            <RightActions>
              <Note>
                Note: Only {remainingPercentage}% is available for adding shareholders.
              </Note>
              <AddButton onClick={() => setShowModal(true)}>
                + Add Shareholder
              </AddButton>
            </RightActions>
          )}
        </HeaderRow>
        <SectionUnderline />
      </SectionHeaderWrapper>


        {shareholderList?.length === 0 ? (
          <EmptyState>
            <Icon>
              <img src={businessActivityLogo} alt="Business Activity Logo" />
            </Icon>
            <EmptyText>
              There is no records to display.
              <br />
              Add your shareholder to get started.
            </EmptyText>
            <AddButton onClick={() => setShowModal(true)}>
              + Add Shareholder
            </AddButton>
          </EmptyState>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Percentage</Th>
                  {/* <Th>Nationality</Th>
                  <Th>Legal Status</Th> */}
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {shareholderList?.map((s, index) => (
                  <tr key={s.id}>
                    <Td>{s?.id}</Td>
                    <Td>{s?.full_name}</Td>
                    <Td>{s?.type}</Td>
                    <Td>{s.shares_percentage}</Td>
                    {/* <Td>{"s.nationality"}</Td>
                    <Td>{"s.legalStatus"}</Td> */}
                    <Td>
                      <Actions>
                        <ActionImage src={editIcon} alt="editIcon" />
                        <ActionImage src={deleteIcon} alt="deleteIcon" />
                      </Actions>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <AddButton onClick={() => setShowModal(true)}>
                + Add Shareholder
              </AddButton>
            </div> */}
          </>
        )}
      </Card>

      {showModal && (
        <AddShareholderModal isOpen={true} onClose={handleAddShareholder} />
      )}
    </PageWrapper>
  );
};

export default ShareholderStep;
