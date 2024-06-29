import TermsOfService from "@/components/terms-service";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "Terms of Service iQopy | Smart's Money Edge",
};
const index = () => {
   return (
      <Wrapper>
         <TermsOfService />
      </Wrapper>
   )
}

export default index