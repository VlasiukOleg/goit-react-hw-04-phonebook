import styled from 'styled-components';
import { Form } from 'formik';

export const PhoneBookForm = styled(Form)`
  label {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;

    span {
      margin-bottom: 5px;
    }

    input {
      width: 320px;
      border-radius: 5px;
      border: none;
      outline: none;
      padding: 5px;
    }
  }
`;

export const AddButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 5px 15px;
  background-color: rgba(0, 128, 0, 0.57);
  color: white;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: green;
  }
`;

export const Message = styled.div`
  font-size: 12px;
  color: tomato;
  margin-bottom: 4px;
`;
