import { useState } from "react";
import { createClient } from "contentful";
import BenefitsCard from "../../../components/BenefitsCard";
import TermInsuranceCalculator from "./termInsuranceCalculator";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


export default function IPS({ benefits, config }) {
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const handleCardClick = (benefit) => {
    setSelectedBenefit(benefit);
  }

  return (
    <>
      <div className="layout">
        <div>
          <h3 className="nav">
            <span>ICICI Pru iProtect Smart</span>
          </h3>
        </div>
        <div className="ips-section">

          <div
            className="benefits-banner"
            key="benefits-header"
            onClick={() => {setSelectedBenefit(null)}}
          >
            {selectedBenefit ? (
              <div
                className="benefit-expanded"
                onClick={(e) => e.stopPropagation()}
              >
                {/* <span>{selectedBenefit?.title}</span> */}
                {console.log(selectedBenefit)}
                <div className="benefit-description">

                  {documentToReactComponents(selectedBenefit?.benefitDetail)}
                </div>
                {/* <button className="back-button" onClick={() => setSelectedBenefit(null)}>←</button> */}
              </div>
            ) : (
              benefits.map((benefit) => (
                <BenefitsCard
                  key={benefit?.sys?.id}
                  benefit={benefit.fields}
                  onCardClick={() => handleCardClick(benefit.fields)}
                />
              ))
            )}
          </div>


          <div className="benefit-calculator">
            <TermInsuranceCalculator formConfig={config} />
          </div>
        </div>
      </div>
    </>
  );
}


export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  });
  const response = await client.getEntries({ content_type: "benefits" });
  const response2 = await client.getEntries({ content_type: "formConfig" });
  return {
    props: {
      benefits: response.items,
      config: response2.items,
    },
    revalidate: 3,
  };
}
