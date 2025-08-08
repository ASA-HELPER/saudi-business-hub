import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import { BusinessActivityRowItem } from "../../store/types/businessActivity";
import { RootState } from "../../store";
import {
  deleteActivityRow,
  loadBusinessActivityRow,
  resetBusinessActivity,
} from "../../store/reducers/businessActivitySlice";
import { useNavigate } from "react-router-dom";
import { selectSelectedRegistrationType } from "../../store/selectors/registrationTypeSelectors";

const TableWrapper = styled.div`
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  border-radius: 12px;
  overflow: hidden;

  thead {
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 600;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    color: #000;
  }
`;

const ActionImage = styled.img`
  width: 32px;
  height: 32px;
`;

const AddButton = styled.button`
  background-color: #007c92;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

export default function BusinessActivityRow() {
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
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>ISIC Code</th>
              <th>Registration Business Activity</th>
              <th>Classification</th>
              <th>Actions</th>
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
                  {/* <ActionImage
                  src={editIcon}
                  alt="edit"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    dispatch(loadBusinessActivityRow(row));
                    navigate("/businessReg");
                  }}
                /> */}
                  <ActionImage
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => dispatch(deleteActivityRow(index))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddButton
          onClick={() => {
            dispatch(resetBusinessActivity());
            navigate("/businessReg", {
              state: { registrationTypeId: selectedType?.id },
            });
          }}
        >
          + Add Business Activities
        </AddButton>
      </div>
    </>
  );
}
