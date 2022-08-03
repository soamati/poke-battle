import client from "src/client";
import { GetServerSideProps } from "next";
import { WhoamiQuery, WhoamiDocument } from "src/generated";

const notAuthRoutes = ["/signin"];

const withAuthGSSP = (): GetServerSideProps => {
  return async ({ req, resolvedUrl }) => {
    let user: WhoamiQuery["whoami"] = null;
    try {
      const { cookie } = req.headers;

      console.log(cookie);

      const res = (await client.request(WhoamiDocument, {}, {
        cookie,
      } as HeadersInit)) as WhoamiQuery;

      console.log({ res });

      user = res.whoami;

      if (!user && !notAuthRoutes.includes(resolvedUrl)) {
        return {
          redirect: {
            destination: "/signin",
            permanent: true,
          },
        };
      }

      if (user && notAuthRoutes.includes(resolvedUrl)) {
        console.log("hajaa");
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      }

      return {
        props: {
          user,
        },
      };
    } catch (error) {
      console.log("error!");
      return {
        props: {
          user: null,
        },
      };
    }
  };
};

export default withAuthGSSP;
