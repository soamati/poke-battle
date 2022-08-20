import client from "src/client";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { WhoamiQuery, WhoamiDocument } from "src/generated";

const notAuthRoutes = ["/signin", "/signup"];

const withAuthGSSP = (innerGSSP?: GetServerSideProps): GetServerSideProps => {
  return async (ctx) => {
    const { req, resolvedUrl } = ctx;
    let user: WhoamiQuery["whoami"] = null;
    try {
      const { cookie } = req.headers;

      const res = (await client.request(WhoamiDocument, {}, {
        cookie,
      } as HeadersInit)) as WhoamiQuery;

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
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      }

      let result: GetServerSidePropsResult<any> = {
        props: {
          user,
        },
      };

      if (innerGSSP) {
        const innerResult = await innerGSSP(ctx);
        result = {
          ...result,
          ...innerResult,
          props:
            "props" in innerResult
              ? { ...result.props, ...innerResult.props }
              : result.props,
        };
      }

      return result;
    } catch (error) {
      return {
        props: {
          user: null,
        },
      };
    }
  };
};

export default withAuthGSSP;
