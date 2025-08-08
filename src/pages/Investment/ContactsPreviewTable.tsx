import React, { useState } from "react";
import styled from "styled-components";
import { Search, Edit, Trash2 } from "lucide-react";

interface ContactsPreview {
  name: string;
  identity: string;
  issueDate: string;
  expiryDate: string;
  city: string;
  country: string;
  nationality: string;
  region: string;
  mobile: string;
  email: string;
}

interface ContactsPreviewTableProps {
  contactsholders?: ContactsPreview[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// Styled Components
const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const SearchContainer = styled.div`
  padding: 20px;
  //border-bottom: 1px solid #e5e7eb;
`;

const SearchInputWrapper = styled.div`
  position: relative;
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #00778e;
    box-shadow: 0 0 0 3px rgba(0, 119, 142, 0.1);
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
  white-space: nowrap;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;

  &:first-child {
    width: 60px;
    text-align: center;
  }

  &:last-child {
    width: 120px;
    text-align: center;
    border-right: none;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
  vertical-align: middle;
  border-right: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;

  &:first-child {
    text-align: center;
    font-weight: 600;
    color: #64748b;
  }

  &:last-child {
    border-right: none;
  }

  tr:last-child & {
    border-bottom: none;
  }
`;

const NameCell = styled(TableCell)`
  font-weight: 600;
  color: #1e293b;
  font-family: "29LT_Bukra-SmBd", Helvetica, sans-serif;
`;

const TypeBadge = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  font-family: "29LT_Bukra-Medium", Helvetica, sans-serif;

  ${(props) =>
    props.$type === "Person"
      ? `
    background-color: #dbeafe;
    color: #1e40af;
    border: 1px solid #bfdbfe;
  `
      : `
    background-color: #f3e8ff;
    color: #7c3aed;
    border: 1px solid #e9d5ff;
  `}
`;

const PercentageCell = styled(TableCell)`
  font-weight: 600;
  color: #059669;
  font-family: "29LT_Bukra-SmBd", Helvetica, sans-serif;
`;

const ActionsCell = styled(TableCell)`
  text-align: center;
  display: flex;
  flex-direction: row;
`;

const ActionButton = styled.button<{ $variant: "edit" | "delete" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 4px;

  ${(props) =>
    props.$variant === "edit"
      ? `
    background-color: #dbeafe;
    color: #1d4ed8;
    
    &:hover {
      background-color: #bfdbfe;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(29, 78, 216, 0.2);
    }
  `
      : `
    background-color: #fee2e2;
    color: #dc2626;
    
    &:hover {
      background-color: #fecaca;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #64748b;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
`;

const defaultContactsPreviewholders: ContactsPreview[] = [
  {
    name: "Omar Majid Al-Rashid",
    identity: "1234567890",
    issueDate: "2020-03-15",
    expiryDate: "2030-03-14",
    city: "Riyadh",
    country: "Saudi Arabia",
    nationality: "Saudi",
    region: "Central Region",
    mobile: "+966 50 123 4567",
    email: "omar.alrashid@email.com",
  },
  {
    name: "Fatima Ahmed Al-Zahra",
    identity: "9876543210",
    issueDate: "2019-07-22",
    expiryDate: "2029-07-21",
    city: "Jeddah",
    country: "Saudi Arabia",
    nationality: "Saudi",
    region: "Western Region",
    mobile: "+966 55 987 6543",
    email: "fatima.alzahra@email.com",
  },
  {
    name: "Mohammed Hassan Al-Qureshi",
    identity: "5678901234",
    issueDate: "2021-01-10",
    expiryDate: "2031-01-09",
    city: "Dammam",
    country: "Saudi Arabia",
    nationality: "Saudi",
    region: "Eastern Region",
    mobile: "+966 56 789 0123",
    email: "mohammed.qureshi@email.com",
  },
  {
    name: "Aisha Khalid Al-Mansouri",
    identity: "3456789012",
    issueDate: "2018-11-05",
    expiryDate: "2028-11-04",
    city: "Medina",
    country: "Saudi Arabia",
    nationality: "Saudi",
    region: "Western Region",
    mobile: "+966 54 345 6789",
    email: "aisha.mansouri@email.com",
  },
];

export const ContactsPreviewTable: React.FC<ContactsPreviewTableProps> = ({
  contactsholders = defaultContactsPreviewholders,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShareholders = contactsholders.filter(
    (contactsholders) =>
      contactsholders.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contactsholders.nationality
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
    <TableContainer>
      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Shareholder name, Nationality"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputWrapper>
      </SearchContainer>

      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Name In English</TableHeaderCell>
            <TableHeaderCell>Identity Number</TableHeaderCell>
            <TableHeaderCell>Issue Date</TableHeaderCell>
            <TableHeaderCell>Expiry Date</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>Country</TableHeaderCell>
            <TableHeaderCell>Nationality</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
            <TableHeaderCell>Mobile Number</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {filteredShareholders.length > 0 ? (
            filteredShareholders.map((contactsholder, index) => (
              <TableRow key={contactsholder.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{contactsholder.name}</TableCell>
                <TableCell>
                  {/* <TypeBadge $type={shareholder.type}>
                    {shareholder.type}
                  </TypeBadge> */}
                  {contactsholder.identity}
                </TableCell>
                {/* <PercentageCell>{shareholder.percentage}</PercentageCell> */}
                <TableCell>{contactsholder.issueDate}</TableCell>
                <TableCell>{contactsholder.expiryDate}</TableCell>
                <TableCell>{contactsholder.city}</TableCell>
                <TableCell>{contactsholder.country}</TableCell>
                <TableCell>{contactsholder.nationality}</TableCell>
                <TableCell>{contactsholder.region}</TableCell>
                <TableCell>{contactsholder.mobile}</TableCell>
                <TableCell>{contactsholder.email}</TableCell>
                <ActionsCell>
                  <ActionButton
                    $variant="edit"
                    onClick={() => {}}
                    title="Edit shareholder"
                  >
                    <Edit size={16} />
                  </ActionButton>
                  <ActionButton
                    $variant="delete"
                    onClick={() => {}}
                    title="Delete shareholder"
                  >
                    <Trash2 size={16} />
                  </ActionButton>
                </ActionsCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState>
                  No shareholders found matching your search criteria.
                </EmptyState>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
