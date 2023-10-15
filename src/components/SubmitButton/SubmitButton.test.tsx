/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { FormInstance } from "antd";
import jest from "jest-mock";
import type { FieldData, FieldError } from "rc-field-form/es/interface";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import type { Options } from "scroll-into-view-if-needed";
import { describe, expect, it } from "vitest";

import { store } from "../../store/store";

import SubmitButton from "./SubmitButton";

describe("SubmitButton", () => {
  const mockForm: FormInstance = {
    getFieldValue: jest.fn((field) => {
      if (field === "username") return "john_doe";
      if (field === "roomnumber") return "222";
    }),
    setFieldsValue: jest.fn(),
    scrollToField(_name: any, _options?: Options | undefined): void {
      throw new Error("Function not implemented.");
    },
    getFieldInstance(_name: any) {
      throw new Error("Function not implemented.");
    },
    getFieldsValue: undefined,
    getFieldError(_name: any): string[] {
      throw new Error("Function not implemented.");
    },
    getFieldsError(_nameList?: any[] | undefined): FieldError[] {
      throw new Error("Function not implemented.");
    },
    getFieldWarning(_name: any): string[] {
      throw new Error("Function not implemented.");
    },
    isFieldsTouched: undefined,
    isFieldTouched(_name: any): boolean {
      throw new Error("Function not implemented.");
    },
    isFieldValidating(_name: any): boolean {
      throw new Error("Function not implemented.");
    },
    isFieldsValidating(_nameList?: any[] | undefined): boolean {
      throw new Error("Function not implemented.");
    },
    resetFields(_fields?: any[] | undefined): void {
      throw new Error("Function not implemented.");
    },
    setFields(_fields: FieldData[]): void {
      throw new Error("Function not implemented.");
    },
    setFieldValue(_name: any, _value: any): void {
      throw new Error("Function not implemented.");
    },
    validateFields: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve();
        }),
    ),
    submit(): void {
      throw new Error("Function not implemented.");
    },
  };

  it("renders button correctly", async () => {
    let submittable = false;
    await mockForm.validateFields({ validateOnly: true }).then(() => {
      submittable = true;
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <SubmitButton form={mockForm} />
        </Provider>
      </BrowserRouter>,
    );

    const submitButton = screen.getByRole("button", { name: /let's start!/i });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();


  });

  it("enables the button when form is valid", async () => {
    let submittable = false;
    await mockForm.validateFields({ validateOnly: true }).then(() => {
      submittable = true;
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SubmitButton form={mockForm} />
        </Provider>
      </BrowserRouter>,
    );
    const submitButton = screen.getByRole("button", { name: /let's start!/i });

    expect(submittable).toBe(true);
     // ???
    expect(submitButton).toBeDisabled();
  });

  it("calls handleisOnCall when button is clicked", async () => {
    const submittable = false;
    const handleisOnCall = jest.fn()

    // await mockForm.validateFields({ validateOnly: true }).then(() => {
    //   submittable = true;
    // });
    
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SubmitButton form={mockForm} />
        </Provider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(mockForm.validateFields).toHaveBeenCalledWith({ validateOnly: true });
    });

    const submitButton = screen.getByRole("button", { name: /let's start!/i });
    submitButton.addEventListener('click', handleisOnCall)

    fireEvent.click(submitButton);

    expect(handleisOnCall).toHaveBeenCalledTimes(1);
  });
});
