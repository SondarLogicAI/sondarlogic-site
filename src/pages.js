/* ─── CONTENT PAGES ───────────────────────────────────────────
   The homepage sells. These pages answer the question somebody typed
   before they had heard of us, which is the only way a site with no
   press, no reviews and no backlinks gets found or quoted.

   Each page is data here and is rendered by ContentPage below. Adding
   one means adding an entry to PAGES, and nothing else: App.jsx builds
   its route from the key and scripts/prerender.mjs writes it to
   dist/<slug>/index.html with its own title, description and canonical.

   Writing rules for anything added here. Plain declarative sentences,
   because a sentence that states a fact on its own is a sentence an
   assistant can lift and attribute. No em dashes. No published per
   claim rates. Describe what the engine catches, never how it decides.
   The company is a marketing fulfillment and validation business, so do
   not describe it as a financial services or an artificial intelligence
   company anywhere on these pages. */

export const PAGES = {
  "rebate-processing": {
    path: "/rebate-processing",
    pill: "REBATE PROCESSING",
    title: "Rebate Processing for Consumer Brands | SondarLogic",
    description:
      "How consumer rebate processing works, why the legacy cheque model takes six to eight weeks, and what changes when claims are validated from the receipt and paid the same day.",
    h1: "Rebate processing for consumer brands",
    lede:
      "Rebate processing is the work that happens between a shopper submitting proof of purchase and that shopper being paid. Validating the receipt, checking it against the campaign rules, catching the claims that should not be paid, and issuing the reward. Most brands outsource all of it to a processor and never see the detail.",
    sections: [
      {
        h2: "What a rebate processor actually does",
        paras: [
          "A processor receives claims, reads the proof of purchase, decides whether each claim qualifies, and pays the ones that do. Traditionally that meant a mail in form, a stapled receipt, a data entry clerk, and a cheque printed in a batch run.",
          "The decision is the hard part. A claim can fail because the wrong product was bought, because the purchase date falls outside the promotion window, because the retailer was not on the list, because the same receipt has already been claimed, or because the image is unreadable. Each of those needs a different answer, and only one of them is fraud.",
        ],
      },
      {
        h2: "Why the legacy model takes six to eight weeks",
        paras: [
          "The wait is not caused by the validation. It is caused by batching. Claims are accumulated, keyed in, reviewed, approved in a run, and then a cheque is printed, stuffed, and mailed. Every step waits for the step before it to reach a worthwhile volume.",
          "The consumer experiences that as silence. They submitted a receipt, heard nothing, and by the time the cheque arrives they have forgotten which promotion it was for. That is a bad outcome for a programme whose entire purpose was to make somebody feel good about buying the product.",
        ],
      },
      {
        h2: "What same day processing changes",
        paras: [
          "SondarLogic validates a claim from a photographed receipt in under ten seconds and returns one of four outcomes. Approved, rejected, held for manual review, or a request to resubmit a clearer photo. An approved claim releases a digital Visa gift card the same day.",
          "Removing the batch removes the wait, and removing the wait removes most of the support volume. Nobody emails to ask where their cheque is when the reward arrived the afternoon they claimed.",
        ],
        list: [
          "Under ten seconds from submitted receipt to a decision with a reason attached",
          "Same day digital Visa gift card instead of a cheque printed in a batch",
          "Blurry or cropped photos get an automated resubmission request rather than a denial",
          "Exceptions go to a person on our team, not to the brand",
        ],
      },
      {
        h2: "The claim data most brands never get back",
        paras: [
          "A processor is paid to decide claims, so a processor hands back decisions. A spreadsheet of approvals and rejections, and little else. The receipt itself is discarded once it has done its job.",
          "That receipt is the most honest piece of first party data a brand will ever be handed. It shows the full basket, the retailer, the location, the date, the total spend, and every competing and complementary product the shopper bought in the same trip. SondarLogic returns all of it, sorted into audiences a marketing team can act on.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does rebate processing take?",
        a: "With a legacy processor, six to eight weeks is the standard, because claims are batched before a cheque run. SondarLogic returns a decision in under ten seconds and pays an approved claim the same day.",
      },
      {
        q: "What is the difference between a rebate processor and a fulfillment house?",
        a: "A processor decides whether a claim qualifies. A fulfillment house issues the reward. Many companies do both, and the terms are used loosely. SondarLogic validates claims and can either hand the decision to an existing fulfillment partner or release the reward itself, depending on how the programme is set up at onboarding.",
      },
      {
        q: "Do you replace our existing fulfillment partner?",
        a: "Not necessarily. The engine runs behind whoever already owns the programme. It can sit underneath a fulfillment house or an agency, validate the claims, and hand back the decisions, leaving the client relationship exactly where it is.",
      },
      {
        q: "What does rebate processing cost?",
        a: "Pricing is per validated claim and scales with volume. Manual review, resubmission handling and the claim data are included in that rate rather than charged as add ons. Ask for a quote at partnership@sondarlogic.com.",
      },
      {
        q: "Where is SondarLogic based?",
        a: "Burlington, Ontario, Canada. All claimant information and receipt images are processed and stored in Canada, under PIPEDA.",
      },
    ],
  },

  "instant-rebates": {
    path: "/instant-rebates",
    pill: "INSTANT VS MAIL IN",
    title: "Instant Rebates vs Mail In Rebates | SondarLogic",
    description:
      "A straight comparison of instant rebates, mail in rebates and digital rebates: how each is funded, how long each takes to pay, redemption rates, and which one fits a given promotion.",
    h1: "Instant rebates vs mail in rebates",
    lede:
      "The three common shapes are the instant rebate taken off at the till, the mail in rebate claimed after the fact, and the digital rebate claimed from a photographed receipt. They are funded differently, they pay on very different timescales, and they produce very different data.",
    sections: [
      {
        h2: "Instant rebate",
        paras: [
          "The discount comes off at the point of sale. The shopper never claims anything, so redemption is effectively total and the brand funds every unit sold during the promotion.",
          "It is simple and it converts, but it buys no information. The brand learns that units moved and nothing about who moved them. It also requires retailer cooperation at the till, which rules it out for most brands that do not control the shelf.",
        ],
      },
      {
        h2: "Mail in rebate",
        paras: [
          "The shopper buys at full price, mails a form and a receipt, and waits for a cheque. The gap between purchase and payment is normally six to eight weeks.",
          "Breakage is the quiet reason this shape survived. A meaningful share of shoppers never submit, and of those who do, some never cash the cheque. The brand pays less than the face value of the offer. It also loses a good deal of goodwill from the people who did submit and then waited two months in silence.",
        ],
      },
      {
        h2: "Digital rebate",
        paras: [
          "The shopper photographs the receipt, submits it from their phone, and is paid to a digital gift card. With SondarLogic the decision comes back in under ten seconds and an approved reward is released the same day.",
          "It keeps the claim step, so the brand still gets proof of purchase and the shopper still has to have bought the product. What it removes is the wait, the postage, the data entry and the cheque. What it adds is the receipt itself, which is the only part of any of these three shapes that tells the brand something it did not already know.",
        ],
      },
      {
        h2: "Which one fits",
        list: [
          "Instant rebate when the goal is pure volume during a fixed window and retailer cooperation is available",
          "Mail in rebate when breakage is deliberately part of the funding model and the offer value is high enough to survive the wait",
          "Digital rebate when the programme needs proof of purchase, a good consumer experience, and the claim data afterwards",
        ],
        paras: [
          "In practice most consumer brands running a mail in programme today are running it because that is what their processor supports, not because the mail in shape was chosen on its merits.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between an instant rebate and a mail in rebate?",
        a: "An instant rebate is deducted at the register, so the shopper never files a claim. A mail in rebate is claimed after the purchase by sending in a form and a receipt, and is normally paid by cheque six to eight weeks later.",
      },
      {
        q: "Are digital rebates the same as cashback?",
        a: "Broadly yes. Both require proof of purchase after the fact and pay the shopper a set amount back. Cashback is the more common term in Europe, rebate in North America. SondarLogic handles both the same way.",
      },
      {
        q: "Why do mail in rebates take six to eight weeks?",
        a: "Because claims are batched. They are accumulated, keyed in, reviewed, approved in a run, and paid in a cheque run. Each stage waits for enough volume to be worth processing. The validation itself is not what takes the time.",
      },
      {
        q: "Does paying instantly increase redemption cost?",
        a: "It can, because faster and easier claiming means fewer people abandon the claim. That is a budgeting question rather than a reason to keep the wait. A programme that pays quickly gets a better completion rate and a much better consumer experience, and the claim data it produces is usually worth more than the breakage it gives up.",
      },
    ],
  },

  "receipt-validation": {
    path: "/receipt-validation",
    pill: "RECEIPT VALIDATION",
    title: "Receipt Validation for Rebate and Cashback Claims | SondarLogic",
    description:
      "How automated receipt validation works for promotional claims: reading a photographed receipt, checking it against campaign rules, catching duplicate and altered submissions, and returning a decision with its reason.",
    h1: "Receipt validation for rebate and cashback claims",
    lede:
      "Receipt validation is the step that decides whether a submitted proof of purchase supports the claim attached to it. Done by hand it is slow and inconsistent. Done automatically it is the difference between a rebate paid the same day and a rebate paid in two months.",
    sections: [
      {
        h2: "What gets checked",
        paras: [
          "A photographed receipt has to answer several questions before a claim can be paid. Which products were bought. Where and when. At what price. Whether the retailer and the date fall inside the promotion. Whether this exact image has been submitted before.",
          "SondarLogic reads the whole receipt, not just the line the claim depends on, and checks the extracted detail against what the claimant typed on the form. Where those two disagree, the disagreement is the finding.",
        ],
      },
      {
        h2: "The four outcomes",
        paras: [
          "Every claim returns one of four results, and each one carries the reason it was reached. That reason is what makes a decision defensible later, and what lets a brand answer a complaint without reopening the file.",
        ],
        list: [
          "Approved. The claim qualifies and the reward is released.",
          "Rejected. The claim does not qualify, with the specific rule it failed.",
          "Manual review. The claim is an edge case and goes to a person on our team with a full audit trail, not to the brand.",
          "Resubmission requested. The photo is unreadable, so the claimant is asked for a clearer one automatically. Nothing is auto denied for a bad photo.",
        ],
      },
      {
        h2: "What it catches",
        paras: [
          "The claims that should not be paid tend to arrive in recognisable shapes. The same receipt submitted twice under two names. A receipt edited to change a date or a product. A screenshot of somebody else's claim. A receipt from a retailer that was never part of the promotion. A purchase made a week after the promotion closed.",
          "All of those are caught before payment rather than found in a reconciliation months later. We describe what the engine catches rather than how it decides, because a published method is a method somebody can work around.",
        ],
      },
      {
        h2: "Receipts that are not supermarket receipts",
        paras: [
          "A great deal of promotional claiming happens outside grocery. Veterinary invoices, optical dispensing receipts, tire and service invoices, contractor invoices, dealer paperwork. These are longer, less standardised, and often carry a named individual and a clinic or branch on the page.",
          "The engine is built to read them as well as a till roll, and to treat what is on them with the care that information deserves. That also means a brand never needs to send us its own claimant records to get a programme running.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does automated receipt validation take?",
        a: "Under ten seconds from the submitted image to a decision with its reason attached.",
      },
      {
        q: "What happens if a receipt photo is blurry?",
        a: "The claimant gets an automated, brand styled request to submit a clearer photo. Claims are never denied for image quality alone, and a legitimate resubmission is not treated as a duplicate.",
      },
      {
        q: "Can it read receipts other than grocery till receipts?",
        a: "Yes. Veterinary invoices, optical receipts, tire and automotive service invoices, dealer paperwork and contractor invoices are all handled. Those documents are longer and less standardised than a till roll, and they are common in the categories that run rebate programmes.",
      },
      {
        q: "What happens to claims the engine cannot decide?",
        a: "They route to manual review and are handled by a person on the SondarLogic side, with the full audit trail and a recommendation. The brand does not inherit a review queue, and manual review is included in the per claim rate rather than billed separately.",
      },
      {
        q: "Do you need our customer data to validate claims?",
        a: "No. Claims arrive from the claimant through the submission portal. A brand never has to hand over its own claimant or customer records to run a programme.",
      },
    ],
  },

  "automotive-rebates": {
    path: "/automotive-rebates",
    pill: "AUTOMOTIVE",
    title: "Automotive Rebate Programs: Oil, Tires, Parts and Service | SondarLogic",
    description:
      "Rebate and cashback processing for automotive brands. Reads tire, service and parts invoices as well as till receipts, pays the same day, and returns which vehicle and which competing products were on the invoice.",
    h1: "Automotive rebate programs",
    lede:
      "Motor oil, tires, batteries, wiper blades, parts and service. Automotive promotions are claimed against invoices rather than neat till receipts, they are often seasonal, and the paperwork usually names a dealer or an installer as well as a product.",
    sections: [
      {
        h2: "Why automotive claims are harder",
        paras: [
          "A tire or service invoice is a document, not a receipt. It runs to multiple lines, mixes parts and labour, carries a dealer or installer name, and often lists a vehicle. A validation step built for a grocery till roll struggles with all of that and pushes the difference to a human reviewer.",
          "Seasonality makes it worse. A winter tire or a summer oil change promotion concentrates most of a programme's claims into a few weeks, which is exactly when a batched processor falls furthest behind.",
        ],
      },
      {
        h2: "What the invoice tells you",
        paras: [
          "An automotive invoice is unusually informative. It shows the installer or dealer, the total ticket, whether the promoted product went on alongside a service, and what else was fitted at the same time.",
          "That answers questions an automotive marketing team normally cannot answer. Which installers actually push the product. Whether a rebate is pulling incremental purchases or subsidising work that was booked anyway. Which competing brand was displaced, and at which locations.",
        ],
        list: [
          "Installer and dealer level performance across the whole programme",
          "Competing and complementary products fitted on the same invoice",
          "Regional concentration, so seasonal spend can be aimed at the right markets",
          "Claimants sorted into audiences, including due for a repeat purchase",
        ],
      },
      {
        h2: "Paying at the speed of the purchase",
        paras: [
          "Someone who has just spent several hundred dollars on tires is a poor candidate for a two month wait. Same day payout on a digital Visa gift card lands while the purchase still feels recent, and it removes almost all of the where is my rebate support volume that a seasonal automotive programme generates.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you validate tire and service invoices, not just receipts?",
        a: "Yes. Multi line service and parts invoices, dealer paperwork and installer invoices are all handled, including documents that mix parts and labour.",
      },
      {
        q: "Can a rebate be restricted to specific installers or dealers?",
        a: "Yes. Campaign rules can limit a promotion to a named list of retailers, dealers or installers, and a claim from outside that list is rejected with that reason attached.",
      },
      {
        q: "How do you handle a seasonal spike in claims?",
        a: "Claims are processed as they arrive rather than in batches, so a concentrated seasonal programme does not create a backlog. There is no cheque run to queue behind.",
      },
      {
        q: "What data comes back from an automotive rebate program?",
        a: "The full invoice detail. Installer or dealer, location, total ticket value, the promoted product, and every competing and complementary item on the same invoice, with claimants grouped into audiences the marketing team can act on.",
      },
    ],
  },

  "cpg-rebates": {
    path: "/cpg-rebates",
    pill: "CPG AND GROCERY",
    title: "CPG Rebate and Cashback Programs | SondarLogic",
    description:
      "Rebate, cashback and try me free processing for consumer packaged goods brands. Same day digital payout, full basket data from every claimed receipt, and competitor detection across submissions.",
    h1: "CPG rebate and cashback programs",
    lede:
      "Consumer packaged goods promotions are high volume and low value per claim, which makes the cost and speed of processing the whole argument. A claim worth five dollars cannot carry six weeks of administration and a printed cheque.",
    sections: [
      {
        h2: "The economics of a small claim",
        paras: [
          "A grocery rebate is usually a few dollars. Once a processor has keyed it, reviewed it, printed a cheque and mailed it, the cost of handling the claim can approach the value of the offer.",
          "Validating from a photographed receipt and paying to a digital card removes the postage, the printing and the data entry entirely. The claim is decided in under ten seconds and paid the same day.",
        ],
      },
      {
        h2: "The basket is the point",
        paras: [
          "A grocery receipt is a complete picture of a shopping trip. It shows the retailer, the location, the date, the total spend, and everything else in the basket alongside the promoted product.",
          "For a CPG brand that is rare and valuable. It shows which retailers the promotion is really moving product in, what else the buyer of a brand buys in the same trip, which competing brands sit in the basket next to it, and what a promotional buyer spends overall.",
        ],
        list: [
          "Competitor products detected across every claimed receipt",
          "Retailer and regional performance measured from actual purchases",
          "Basket composition and total spend for people who buy the brand on promotion",
          "Audience segments ready to push to a CRM, including deal seekers and repeat buyers",
        ],
      },
      {
        h2: "Try me free and satisfaction guarantee programmes",
        paras: [
          "Try me free and money back offers use the same machinery but they are not rebates and should not be described as such. A rebate rewards a qualifying purchase. A money back guarantee refunds a purchase the buyer was unhappy with. They imply completely different things about the product and they are budgeted differently.",
          "Both run on the engine. The distinction matters in how the offer is written, not in how the claim is validated.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the submission portal branded to us?",
        a: "Yes. The whole consumer journey, from the submission form through to the gift card delivery email, is branded to the brand's guidelines. SondarLogic does not appear to the consumer.",
      },
      {
        q: "Can you detect competitor products on a claimed receipt?",
        a: "Yes. The full line item detail is extracted from every claimed receipt, so competing and complementary products in the same basket are identified across the programme.",
      },
      {
        q: "Can you handle a high volume promotion?",
        a: "Yes. Claims are processed in order as they arrive, with no manual bottleneck on compliant submissions and no batch run to queue behind.",
      },
      {
        q: "Is a money back guarantee the same as a rebate?",
        a: "No. A rebate rewards a qualifying purchase. A money back guarantee refunds someone who was dissatisfied. They send opposite signals about the product and they are funded differently, even though the claim mechanics look similar.",
      },
    ],
  },

  "paint-rebates": {
    path: "/paint-rebates",
    pill: "PAINT AND HOME IMPROVEMENT",
    title: "Paint and Home Improvement Rebate Programs | SondarLogic",
    description:
      "Rebate processing for paint, coatings and home improvement brands. Handles contractor invoices and multi gallon claims, pays the same day, and returns project level detail from every claimed receipt.",
    h1: "Paint and home improvement rebate programs",
    lede:
      "Paint and coatings rebates sit across two very different claimants. A homeowner buying two gallons for a weekend, and a contractor buying twenty for a job. The same promotion has to serve both, and their paperwork looks nothing alike.",
    sections: [
      {
        h2: "Two claimants, one programme",
        paras: [
          "A homeowner claims against a big box till receipt. A contractor claims against a trade counter invoice, often with an account number, a job reference, and quantities that would look like fraud on a consumer receipt.",
          "Validation has to read both and apply different expectations to each. A twenty gallon claim is normal from a trade account and worth a second look from a retail one, and that distinction has to be a campaign rule rather than a reviewer's judgement call.",
        ],
      },
      {
        h2: "What the receipt shows about the project",
        paras: [
          "Paint is rarely bought alone. The same receipt usually carries primer, rollers, brushes, tape, filler, drop sheets and sometimes the tools for the whole job.",
          "That turns a rebate claim into a view of the project. Interior or exterior, scale, whether the buyer chose the promoted line for the whole job or only part of it, and which competing products they trusted for the rest of it.",
        ],
        list: [
          "Project scale and composition from the full basket on each claim",
          "Retail and trade claimants separated automatically by campaign rule",
          "Competing coatings and sundries bought alongside the promoted line",
          "Regional and store level performance across the promotion",
        ],
      },
      {
        h2: "Contractors notice how fast they are paid",
        paras: [
          "A trade buyer treats a rebate as money owed rather than as a nice surprise, and a six week cheque cycle on a rebate they are entitled to is a reason to buy the other brand next time. Same day payout removes that entirely and is one of the few parts of a promotion a contractor will actually mention to another contractor.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you process contractor and trade counter invoices?",
        a: "Yes. Trade invoices with account numbers, job references and large quantities are handled alongside ordinary retail receipts, with different campaign rules applied to each where the programme calls for it.",
      },
      {
        q: "Can quantity limits be set per claim?",
        a: "Yes. Per claim and per claimant limits are campaign rules, and they can differ between retail and trade claimants in the same promotion.",
      },
      {
        q: "What does a paint rebate claim tell us beyond the sale?",
        a: "The full basket. Primer, sundries, tools and competing coatings bought at the same time, plus the store, the region and the total ticket, which together indicate the scale and type of the project.",
      },
      {
        q: "How quickly are contractors paid?",
        a: "The same day the claim is approved, to a digital Visa gift card, rather than by a cheque issued in a later batch.",
      },
    ],
  },

  "pipeda-compliance": {
    path: "/pipeda-compliance",
    utility: true,
    pill: "PIPEDA",
    title: "PIPEDA Compliance and Canadian Data Residency | SondarLogic",
    description:
      "How SondarLogic handles claimant personal information under PIPEDA: consent, purpose limitation, Canadian data residency, sub processors, retention and the brand's rights as the controlling organisation.",
    h1: "PIPEDA compliance and Canadian data residency",
    lede:
      "Rebate claims carry personal information. A name, an email address, a location, and a receipt that can show a great deal more than the one product the claim is about. PIPEDA governs how that information is handled in Canada, and this page sets out what SondarLogic does with it.",
    sections: [
      {
        h2: "Who holds what role",
        paras: [
          "PIPEDA places the accountability on the organisation that collects the information for its own purposes. For a rebate programme that is the brand running the promotion. SondarLogic processes claims on that brand's behalf and under its instructions, which makes us a service provider rather than the accountable organisation.",
          "That distinction decides everything else on this page. We do not decide what a programme collects, we do not use claim data for our own purposes, and we do not carry it from one client to another.",
        ],
      },
      {
        h2: "Consent and purpose",
        paras: [
          "A claimant submits a receipt in order to be paid. That is the purpose they consented to, and the submission portal states it at the point of collection in the brand's own words.",
          "Information collected for a claim is used to decide that claim, to pay it, and to report on the programme to the brand. Any wider marketing use of a claimant's contact details is the brand's decision to make, on the brand's own consent language, and not something that happens by default because a claim was processed.",
        ],
      },
      {
        h2: "Canadian data residency",
        paras: [
          "All receipt images and all claimant personal information are processed and stored on servers physically located in Canada. This is not a preference or a default that can drift. It is how the platform is configured.",
          "It matters for two reasons. Some brands have a procurement requirement that personal information does not leave the country, and a programme that fails that test is dead before it is evaluated on anything else. And a claimant's information staying in the jurisdiction whose law protects it is simply the right answer.",
        ],
      },
      {
        h2: "What we do not do",
        list: [
          "We do not sell, rent or trade personal information, in any form, to anyone.",
          "We do not use one client's claim data to inform another client's programme.",
          "We do not require a brand to hand over its existing customer or claimant records. Claims come from the claimant.",
          "We do not receive, hold or transmit money on anyone's behalf. Rewards are funded and released from the client's own account.",
        ],
      },
      {
        h2: "Sub processors, retention and access",
        paras: [
          "A small number of vetted sub processors are involved in hosting and reward delivery. Each is bound by a written confidentiality agreement, and the current list is provided to any client who asks for it during onboarding.",
          "Retention is set per programme. Claim records are kept as long as the brand needs them for audit and dispute handling and then disposed of. A claimant who wants to know what is held about them, or wants it corrected or deleted, is directed to the brand as the accountable organisation, and we action the request on the brand's instruction.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is claimant data stored in Canada?",
        a: "Yes. All receipt images and claimant personal information are processed and stored on servers physically located in Canada.",
      },
      {
        q: "Is SondarLogic a data controller or a processor?",
        a: "A processor. In PIPEDA terms the brand running the promotion is the accountable organisation, and SondarLogic processes claims on its behalf and under its instructions.",
      },
      {
        q: "Do you use claim data for your own purposes?",
        a: "No. Claim data belongs to the brand. It is used to decide and pay the claim and to report on that programme, and it is never carried across to another client or sold.",
      },
      {
        q: "Do we have to send you our customer list to run a programme?",
        a: "No, and you should not. Claims arrive from the claimant through the submission portal. A brand never needs to transfer its own customer or claimant records to get a programme running.",
      },
      {
        q: "How does a claimant request access to or deletion of their data?",
        a: "Through the brand, which is the accountable organisation under PIPEDA. SondarLogic actions the request on the brand's instruction and confirms once it is done.",
      },
      {
        q: "How long is claim data retained?",
        a: "It is set per programme, based on how long the brand needs the records for audit and dispute handling, and disposed of after that.",
      },
    ],
    related: ["security", "receipt-validation", "rebate-processing", "privacy", "terms"],
  },

  security: {
    path: "/security",
    utility: true,
    pill: "SECURITY",
    title: "Security and Infrastructure | SondarLogic",
    description:
      "How SondarLogic secures rebate claim data: AES-256 encryption at rest, TLS 1.2 or higher in transit, SOC 2 Type II certified Canadian hosting, and a plain statement of what has and has not been independently audited.",
    h1: "Security and infrastructure",
    lede:
      "A rebate programme hands a processor receipt images and claimant contact details. This page sets out how that is protected, where it is held, and who can reach it.",
    sections: [
      {
        h2: "Encryption and transport",
        list: [
          "AES-256 encryption for all data at rest, including receipt images.",
          "TLS 1.2 or higher for all data in transit, with no unencrypted fallback.",
          "Access to production data is limited to named accounts and logged.",
          "Every claim decision is retained with its reason and a full audit trail.",
        ],
        paras: [
          "The audit trail is worth a line of its own. Every decision the engine reaches is stored with the rule it applied and the evidence it applied it to, which is what lets a disputed rejection be answered months later without reopening the whole file.",
        ],
      },
      {
        h2: "Infrastructure and certification",
        paras: [
          "The platform runs on SOC 2 Type II certified infrastructure, hosted in Canada, with the controls that certification covers applying to the hosting layer.",
          "If your procurement process requires a vendor level report in addition to that, raise it at the start of the conversation so it can be handled in the pilot agreement rather than late in a security review.",
          "For most rebate programmes the questions that decide the review are where the data sits, how it is encrypted, who can reach it and how long it is kept. Those are answered above and on the PIPEDA page.",
        ],
      },
      {
        h2: "Data residency and isolation",
        paras: [
          "All claimant personal information and all receipt images are processed and stored in Canada. Client programmes are isolated from one another, and no client's claim data is used to inform another client's programme.",
          "SondarLogic never receives, holds or transmits funds. Rewards are funded and released from the client's own account, so there is no payment float and no stored payment credential to protect.",
        ],
      },
      {
        h2: "Fraud controls",
        paras: [
          "Duplicate submissions, altered images, templated claims and screenshots of other people's claims are caught before payment rather than found in a reconciliation months later.",
          "We describe what the controls catch rather than how they decide, because a published method is a method somebody works around.",
        ],
      },
    ],
    faqs: [
      {
        q: "What are your security certifications?",
        a: "The platform runs on SOC 2 Type II certified infrastructure, hosted in Canada, with AES-256 encryption at rest and TLS 1.2 or higher in transit. If your procurement requires a vendor level report as well, raise it early so it can be handled in the pilot agreement.",
      },
      {
        q: "How is data encrypted?",
        a: "AES-256 at rest, including receipt images, and TLS 1.2 or higher in transit with no unencrypted fallback.",
      },
      {
        q: "Where is the data hosted?",
        a: "On servers physically located in Canada. Receipt images and claimant personal information never leave the country.",
      },
      {
        q: "Do you hold payment credentials or funds?",
        a: "No. Rewards are funded and released from the client's own account. SondarLogic never receives, holds or transmits money, so there is no float and no stored payment instrument.",
      },
      {
        q: "Is one client's data visible to another?",
        a: "No. Programmes are isolated, and claim data from one client is never used to inform another client's programme or reporting.",
      },
      {
        q: "Do you have a Master Service Agreement?",
        a: "Yes. There is a standard, pre vetted MSA so legal reviews it once rather than negotiating from scratch per programme.",
      },
    ],
    related: ["pipeda-compliance", "receipt-validation", "rebate-processing", "privacy", "terms"],
  },
};

export const PAGE_KEYS = Object.keys(PAGES);

/* The six marketing pages. The compliance pages are routed and indexed the
   same way but are kept out of the marketing cross link strip, because a
   security page in the related list of the automotive page is noise. */
export const CONTENT_KEYS = PAGE_KEYS.filter(k => !PAGES[k].utility);

/* Cross links at the foot of every content page. A crawler that lands on
   one of these should be able to reach all of the others and the homepage,
   which is the whole of the internal link graph for this section. */
const RELATED_LABEL = {
  "rebate-processing":  "Rebate processing explained",
  "instant-rebates":    "Instant rebates vs mail in rebates",
  "receipt-validation": "How receipt validation works",
  "automotive-rebates": "Automotive rebate programs",
  "cpg-rebates":        "CPG rebate and cashback programs",
  "paint-rebates":      "Paint and home improvement rebates",
  "pipeda-compliance":  "PIPEDA and data residency",
  "security":           "Security and infrastructure",
  privacy:              "Privacy Policy",
  terms:                "Terms of Service",
};

export function pageSchema(key, site = "https://www.sondarlogic.com") {
  const p = PAGES[key];
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SondarLogic", item: `${site}/` },
        { "@type": "ListItem", position: 2, name: p.h1, item: `${site}${p.path}` },
      ],
    },
  ];
}

export { RELATED_LABEL };
