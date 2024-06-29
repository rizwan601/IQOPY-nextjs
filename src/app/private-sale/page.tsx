import PrivateSale from "@/components/privatesale/index.client2";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Private Sale iQopy | Smart's Money Edge",
};
const index = () => {
    return (
        <Wrapper>
            <PrivateSale />
        </Wrapper>
    )
}

export default index;