/* eslint-disable prettier/prettier */

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import FrameVc from "./FrameVc";

const mockStore = configureStore();

/* eslint-disable prettier/prettier */
test("renders FrameVc component with expected props", () => {
  const initialState = {
    room: {
      roomName: "11", 
    },
    user: {
      userName: "11", 
    },
  };

   
  const store = mockStore(initialState);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <FrameVc />
      </Provider>
    </BrowserRouter>,
  );

  const jitsiMeetingElement = screen.getByTestId('jitsi-meeting');
  expect(jitsiMeetingElement).toBeInTheDocument();
  expect(jitsiMeetingElement).toHaveAttribute('roomName', 'testRoom');
  expect(jitsiMeetingElement).toHaveAttribute('userInfo.displayname', 'testUser');
});
