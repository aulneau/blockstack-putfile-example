import { Connect, useConnect } from "@blockstack/connect";
import { AppConfig, UserSession } from "blockstack/lib";
const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

const PutFileComponent = () => {
  const { doOpenAuth } = useConnect();
  const handlePutFile = async () =>
    userSession.putFile("some-file.json", JSON.stringify({ content: "foo" }));
  return userSession.isUserSignedIn() ? (
    <div>
      <button onClick={handlePutFile}>do putFile</button>
    </div>
  ) : (
    <div>
      <button onClick={doOpenAuth}>Sign in</button>
    </div>
  );
};

export default function Home() {
  const authOptions = {
    finished: () => {
      console.log("logged in!");
    },
    userSession,
    appDetails: {
      name: "Etags",
      icon: "/app-icon.png",
    },
  };
  return (
    <Connect authOptions={authOptions}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PutFileComponent />
      </div>
    </Connect>
  );
}
