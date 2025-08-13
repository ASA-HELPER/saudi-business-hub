import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";
import { BusinessActivityRowItem } from "../../store/types/businessActivity";
import { RootState } from "../../store";
import {
  deleteActivityRow,
  loadBusinessActivityRow,
  resetBusinessActivity,
} from "../../store/reducers/businessActivitySlice";
import { useNavigate } from "react-router-dom";
import { selectSelectedRegistrationType } from "../../store/selectors/registrationTypeSelectors";
import { useTranslation } from "react-i18next";

// Styled Components
const TableWrapper = styled.div`
  margin-top: 1rem;
`;

const Table = styled.table<{ $isRTL: boolean }>`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  border-radius: 12px;
  overflow: hidden;
  direction: ${({ $isRTL }) => ($isRTL ? 'rtl' : 'ltr')};

  thead {
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 600;
  }

  th,
  td {
    padding: 1rem;
    text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    color: #000;
  }
`;

const ActionImage = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const AddButton = styled.button`
  background-color: #007c92;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00647a;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function BusinessActivityRow() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const activityRows: BusinessActivityRowItem[] = useSelector(
    (state: RootState) => state.businessActivity.activityRows
  );
  const selectedType = useSelector(selectSelectedRegistrationType);

  if (!activityRows || activityRows.length === 0) return null;

  return (
    <>
      <TableWrapper>
        <Table $isRTL={isRTL}>
          <thead>
            <tr>
              <th>{t('businessActivity.tableHeaders.number')}</th>
              <th>{t('businessActivity.tableHeaders.isicCode')}</th>
              <th>{t('businessActivity.tableHeaders.activity')}</th>
              <th>{t('businessActivity.tableHeaders.classification')}</th>
              <th>{t('businessActivity.tableHeaders.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {activityRows.map((row, index) => (
              <tr key={row.activity.id}>
                <td>{String(index + 1).padStart(2, "0")}</td>
                <td>{row.activity.activityid}</td>
                <td>{row.activity.description}</td>
                <td>{row.activity.isic_master_rule?.classification}</td>
                <td>
                  <ActionImage
                    src={deleteIcon}
                    alt={t('action.delete')}
                    onClick={() => dispatch(deleteActivityRow(index))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <ButtonContainer>
        <AddButton
          onClick={() => {
            dispatch(resetBusinessActivity());
            navigate("/businessReg", {
              state: { registrationTypeId: selectedType?.id },
            });
          }}
        >
          {t('businessActivity.addButton')}
        </AddButton>
      </ButtonContainer>
    </>
  );
}