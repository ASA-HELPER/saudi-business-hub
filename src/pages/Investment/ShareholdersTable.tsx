import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "lucide-react";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";
import SectionTitle from "../../components/common/SectionTitle";
import { useTranslation } from "react-i18next";


interface Shareholder {
  id: number;
  name: string;
  type: "Person" | "Organization";
  percentage: string;
  nationality: string;
  legalStatus: string;
  identityNumber: string;
}

interface ShareholdersTableProps {
  shareholders?: Shareholder[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  dir?: "ltr" | "rtl";
}

// Styled Components
const TableContainer = styled.div`
  width: 100%;
  margin: 0;
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  border-left: none;
  border-right: none;
`;

const SearchContainer = styled.div`
  padding: 20px 0;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #00778e;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #6b7280;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-left: none;
  border-right: none;
`;

const TableHeader = styled.thead`
  background-color: #f8fafc;
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  font-family: "29LT_Bukra-SmBd", Helvetica, sans-serif;
  border-bottom: 1px solid rgba(121, 116, 126, 0.16);
  border-right: 1px solid #f1f5f9;

  &:last-child {
    width: 120px;
    text-align: center;
    padding-right: 0;
    border-right: none;
  }

  &:first-child {
    width: 60px;
    text-align: center;
    padding-left: 0;
  }
`;


const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
  border-bottom: 1px solid rgba(121, 116, 126, 0.16);

  /* Add vertical lines between columns */
  border-right: 1px solid #f1f5f9;

  &:last-child {
    border-right: none;
  }

  &:first-child {
    text-align: center;
    font-weight: 600;
    color: #64748b;
    padding-left: 0;
  }
`;

const ActionsCell = styled(TableCell)`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const ActionImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #64748b;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
`;

const defaultShareholders: Shareholder[] = [
  {
    id: 1,
    name: "Omar Majid",
    type: "Person",
    percentage: "70%",
    nationality: "Saudi Arabia",
    legalStatus: "Limited Liability Company",
    identityNumber: ""
  },
  {
    id: 2,
    name: "Gazi Al Hamdan",
    type: "Organization",
    percentage: "10%",
    nationality: "Saudi Arabia",
    legalStatus: "Limited Liability Company",
    identityNumber: ""
  },
  {
    id: 3,
    name: "Sultan Al Kasiri",
    type: "Person",
    percentage: "10%",
    nationality: "Saudi Arabia",
    legalStatus: "Limited Liability Company",
    identityNumber: ""
  },
  {
    id: 4,
    name: "Aayesha Baazar",
    type: "Organization",
    percentage: "10%",
    nationality: "Saudi Arabia",
    legalStatus: "Limited Liability Company",
    identityNumber: ""
  },
  {
    id: 5,
    name: "Farash Al Mashry",
    type: "Person",
    percentage: "10%",
    nationality: "Saudi Arabia",
    legalStatus: "Limited Liability Company",
    identityNumber: ""
  },
];

export const ShareholdersTable: React.FC<ShareholdersTableProps> = ({
  shareholders = defaultShareholders,
  onEdit,
  onDelete,
  dir = "ltr",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const filteredShareholders = shareholders.filter(
    (shareholder) =>
      shareholder.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      shareholder.nationality?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      shareholder.identityNumber?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id);
    } else {
      console.log(`Edit shareholder with ID: ${id}`);
    }
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    } else {
      console.log(`Delete shareholder with ID: ${id}`);
    }
  };

  return (
    <>
      <SectionTitle>
        {t("preview.shareholder.title")}
      </SectionTitle>  
      <TableContainer dir={dir}>
        <SearchContainer>
          <SearchInputWrapper>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder={t("preview.shareholder.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir={dir}
            />
          </SearchInputWrapper>
        </SearchContainer>

        <Table dir={dir}>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>{t("preview.shareholder.columns.number")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.name")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.type")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.percentage")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.nationality")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.legalStatus")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.identityNumber")}</TableHeaderCell>
              <TableHeaderCell>{t("preview.shareholder.columns.actions")}</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {filteredShareholders.length > 0 ? (
              filteredShareholders.map((shareholder, index) => (
                <TableRow key={shareholder.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{shareholder.name}</TableCell>
                  <TableCell>
                    {shareholder.type === "Person" 
                      ? t("preview.shareholder.types.person") 
                      : t("preview.shareholder.types.organization")}
                  </TableCell>
                  <TableCell>{shareholder.percentage}</TableCell>
                  <TableCell>{shareholder.nationality}</TableCell>
                  <TableCell>{shareholder.legalStatus}</TableCell>
                  <TableCell>{shareholder.identityNumber || "—"}</TableCell>
                  <ActionsCell>
                    <ActionImage 
                      src={editIcon} 
                      alt={t("preview.shareholder.edit")} 
                      onClick={() => handleEdit(shareholder.id)} 
                    />
                    <ActionImage 
                      src={deleteIcon} 
                      alt={t("preview.shareholder.delete")} 
                      onClick={() => handleDelete(shareholder.id)} 
                    />
                  </ActionsCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState>
                    {t("preview.shareholder.emptyState")}
                  </EmptyState>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};