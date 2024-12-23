import styled from 'styled-components';

export const RequestBoxContainer = styled.div`
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  position: relative;

  @media (max-width: 1020px) {
    width: 100%;
    margin-right: 0;
    margin-top: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-top: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow-y: auto;
  }
`;

export const CloseDash = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px; /* Made the font size smaller */
  cursor: pointer;
  &:after {
    content: 'X';
  }
`;

export const RequestForm = styled.form`
    display: flex;
    flex-direction: column;
    `;

export const RequestTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #1E90FF;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  font-family: inherit;
  line-height: 1.4;
  color: #333;
  &:focus {
    border-color: #5b197f;
    outline: none;
  }
`;

export const RequestInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #1E90FF;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 10px;
  font-family: inherit;
  color: #333;
  &:focus {
    border-color: #5b197f;
    outline: none;
  }
`;

export const RequestButton = styled.button`
  width: 100%;
  background-color: #1E90FF;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #5b197f;
  }
`;

export const ContactInfoContainer = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

export const ContactLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

export const ContactLink = styled.a`
  color: #8a2be2;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  border-bottom: 1px solid #ddd;
  margin: 15px 0;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;