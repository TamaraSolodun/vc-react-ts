import type { JSX } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import type { RootState } from "../../store/store";

import FrameVc from "./components/FrameVc";

// can use ZOD
// eslint react hooks
// useCallback vs useMemo
// why did you render add (memo(({prop}) => </>)

const conferenceStyle = { height: "100%" };

function VideoConference(): JSX.Element {
  const isOnCall = useSelector((state: RootState) => state.user.isOnCall);
  const userName = useSelector((state: RootState) => state.user.userName);
  const { roomId } = useParams<{ roomId: string | undefined }>();

  return (
    <div style={conferenceStyle}>
      {isOnCall ? (
        <FrameVc />
      ) : userName ? (
        <Navigate to={`/rooms/${roomId}`} />
      ) : (
        <Navigate to={`/join/${roomId}`} />
      )}
    </div>
  );
}
export default VideoConference;
