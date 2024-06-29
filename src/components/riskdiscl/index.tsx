import Breadcrumb from "../common/Breadcrumb"

const RiskDisclaimer = () => {
    return (
        <main>
            <Breadcrumb title="Risk Disclaimer" />
            <section className="features-inner-wrap">
                <div className="container">
                <h2>Risk Disclaimer</h2>
                    <p>
                        <strong>Trading cryptocurrencies involves a high level of risk</strong>, and may not be suitable for all investors. The value of cryptocurrencies can fluctuate widely and can result in significant losses. <strong>Extreme volatility</strong> in cryptocurrency markets may lead to rapid and unpredictable price changes, which could result in the loss of all invested funds.
                    </p>
                    <p>
                        Additionally, there is a risk of losing funds caused by <strong>software errors</strong> or technical glitches on our platform. While we strive to provide a reliable and secure trading environment, we cannot guarantee the absence of software bugs or system failures that may affect your trading experience.
                    </p>
                    <p>
                        It is important to understand that we are <strong>not financial advisers</strong>, and the information provided on our platform should not be considered as financial advice. <strong>We are not responsible for any losses you may incur</strong> as a result of trading cryptocurrencies or relying on information provided on our platform.
                    </p>
                </div>
            </section>
        </main>
    );
};
  
export default RiskDisclaimer;
