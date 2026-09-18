import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [templateName, setTemplateName] = useState("Modern Invoice");
  const [primaryColor, setPrimaryColor] = useState("#635BFF");
  const [secondaryColor, setSecondaryColor] = useState("#14B8A6");
  const [showLogo, setShowLogo] = useState(true);
  const [logo, setLogo] = useState(null);
  const [saved, setSaved] = useState(false);

  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
  const savedTemplate = localStorage.getItem("invoiceTemplate");

  if (!savedTemplate) return;

  try {
    const data = JSON.parse(savedTemplate);

    if (data.templateName !== undefined) setTemplateName(data.templateName);
    if (data.primaryColor !== undefined) setPrimaryColor(data.primaryColor);
    if (data.secondaryColor !== undefined) setSecondaryColor(data.secondaryColor);
    if (data.showLogo !== undefined) setShowLogo(data.showLogo);
    if (data.logo !== undefined) setLogo(data.logo);
    if (data.invoiceNumber !== undefined) setInvoiceNumber(data.invoiceNumber);
    if (data.issueDate !== undefined) setIssueDate(data.issueDate);
    if (data.dueDate !== undefined) setDueDate(data.dueDate);
    if (data.companyName !== undefined) setCompanyName(data.companyName);
    if (data.clientName !== undefined) setClientName(data.clientName);
    if (data.itemDescription !== undefined) setItemDescription(data.itemDescription);
    if (data.itemRate !== undefined) setItemRate(data.itemRate);
    if (data.currency !== undefined) setCurrency(data.currency);
    if (data.paymentMethods !== undefined) {
      setPaymentMethods(data.paymentMethods);
    }
  } catch (error) {
    console.error("Failed to load saved template:", error);
  }
}, []);

  const [invoiceNumber, setInvoiceNumber] = useState("INV-2024-001");
  const [issueDate, setIssueDate] = useState("September 18, 2026");
  const [dueDate, setDueDate] = useState("October 18, 2026");

  const [companyName, setCompanyName] = useState("Acme Studio");
  const [clientName, setClientName] = useState("Northstar Labs");

  const [itemDescription, setItemDescription] =
    useState("Website development");

  const [itemRate, setItemRate] = useState("1,000");
  
  const numericRate = Number(itemRate.replace(/,/g, "")) || 0;
  const secondItem = 250;
  const subtotal = numericRate + secondItem;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const [paymentMethods, setPaymentMethods] = useState({
  bank: true,
  card: true,
  paypal: false,
  });
  const togglePaymentMethod = (method) => {
  setPaymentMethods((prev) => ({
    ...prev,
    [method]: !prev[method],
  }));
  };

  const [currency, setCurrency] = useState("USD");

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    PLN: "zł",
  };

  const symbol = currencySymbols[currency];

  const formatAmount = (amount) => {
    if (currency === "PLN") {
      return `${amount} zł`;
    }

    return `${symbol}${amount}`;
  };

  const handleLogoUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  const handleSaveTemplate = () => {
  const template = {
    templateName,
    primaryColor,
    secondaryColor,
    showLogo,
    logo,
    invoiceNumber,
    issueDate,
    dueDate,
    companyName,
    clientName,
    itemDescription,
    itemRate,
    currency,
    paymentMethods,
  };

  localStorage.setItem("invoiceTemplate", JSON.stringify(template));

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2000);
};

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h1>Invoice Studio</h1>
            <span>Template designer</span>
          </div>
        </div>

        <button
            className={`save-button ${saved ? "saved" : ""}`}
            onClick={handleSaveTemplate}
        >
            {saved ? "✓ Saved" : "Save template"}
        </button>
      </header>

      <main className="workspace">
        <aside className="settings-panel">
          <div className="panel-heading">
            <span>Customize</span>
            <h2>Invoice template</h2>
            <p>
              Personalize your invoice and see changes instantly.
            </p>
          </div>
          <div className="settings-tabs">
            <button
              className={activeTab === "general" ? "active" : ""}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>

            <button
              className={activeTab === "content" ? "active" : ""}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
          </div>
          {activeTab === "general" && (
          <>
          <section className="settings-section">
            <div className="section-title">
              <span>01</span>
              Template
            </div>

            <label>
              Template name
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </label>
          </section>

          <section className="settings-section">
            <div className="section-title">
              <span>02</span>
              Brand colors
            </div>

            <div className="color-row">
              <label>Primary color</label>

              <div className="color-control">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />

                <span>{primaryColor}</span>
              </div>
            </div>

            <div className="color-row">
           <label>Secondary color</label>

      <div className="color-control">
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
        />

        <span>{secondaryColor}</span>
      </div>
    </div>

    <div className="currency-control">
      <label htmlFor="currency">Currency</label>

      <select
        id="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="USD">USD — $</option>
        <option value="EUR">EUR — €</option>
        <option value="GBP">GBP — £</option>
        <option value="PLN">PLN — zł</option>
      </select>
    </div>
          </section>

          <section className="settings-section">
            <div className="section-title">
              <span>03</span>
              Branding
            </div>

            <div className="logo-toggle">
              <div>
                <strong>Show logo</strong>
                <span>Display your company logo</span>
              </div>

              <button
                className={`toggle ${showLogo ? "active" : ""}`}
                onClick={() => setShowLogo(!showLogo)}
                aria-label="Toggle logo"
              >
                <span />
              </button>
            </div>

            {logo ? (
          <div className="logo-preview-box">
            <div className="logo-preview-image">
              <img src={logo} alt="Uploaded company logo" />
            </div>

            <div className="logo-preview-info">
              <strong>Logo uploaded</strong>
              <span>Your logo is visible in the invoice</span>
            </div>

            <div className="logo-actions">
              <label className="change-logo-button">
                Change logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>

              <button
                className="remove-logo-button"
                onClick={handleRemoveLogo}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />

            <div className="upload-icon">↑</div>
            <strong>Upload logo</strong>
            <span>PNG, JPG or SVG</span>
          </label>
        )}
          </section>

          <section className="settings-section">
            <div className="section-title">
              <span>04</span>
              Payment methods
            </div>

            <div className="payment-heading">
              <div>
                <strong>Accept payment methods</strong>
                <span>Choose how customers can pay</span>
              </div>
            </div>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="checkbox"
                  checked={paymentMethods.bank}
                  onChange={() => togglePaymentMethod("bank")}
                />
                <span className="custom-checkbox"></span>
                <span>Bank transfer</span>
              </label>

              <label className="payment-option">
                <input
                  type="checkbox"
                  checked={paymentMethods.card}
                  onChange={() => togglePaymentMethod("card")}
                />
                <span className="custom-checkbox"></span>
                <span>Credit / debit card</span>
              </label>

              <label className="payment-option">
                <input
                  type="checkbox"
                  checked={paymentMethods.paypal}
                  onChange={() => togglePaymentMethod("paypal")}
                />
                <span className="custom-checkbox"></span>
                <span>PayPal</span>
              </label>
            </div>
          </section>
          </>
          )}
          {activeTab === "content" && (
          <>
            <section className="settings-section">
              <div className="section-title">
                <span>01</span>
                Invoice details
              </div>

              <label>
                Invoice number
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </label>

              <label className="content-field">
                Issue date
                <input
                  type="text"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </label>

              <label className="content-field">
                Due date
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </label>
            </section>

            <section className="settings-section">
              <div className="section-title">
                <span>02</span>
                Parties
              </div>

              <label>
                Your company
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </label>

              <label className="content-field">
                Billed to
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </label>
            </section>

            <section className="settings-section">
              <div className="section-title">
                <span>03</span>
                Invoice item
              </div>

              <label>
                Description
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </label>

              <label className="content-field">
                Rate
                <input
                  type="text"
                  value={itemRate}
                  onChange={(e) => setItemRate(e.target.value)}
                />
              </label>
            </section>
          </>
        )}
        </aside>

        <section className="preview-area">
          <div className="preview-header">
            <div>
              <span className="preview-label">LIVE PREVIEW</span>
              <h2>{templateName}</h2>
            </div>

            <div className="live-status">
              <span />
              Live
            </div>
          </div>

          <div className="invoice-wrapper">
            <div
              className="invoice"
              style={{
                "--primary": primaryColor,
                "--secondary": secondaryColor,
              }}
            >
              <div className="invoice-top-line" />

              <div className="invoice-header">
                <div>
                  <span className="invoice-label">INVOICE</span>
                  <h3>#{invoiceNumber}</h3>
                </div>

                {showLogo && (
                  <div
                    className="invoice-logo"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {logo ? (
                      <img src={logo} alt="Company logo" />
                    ) : (
                      "AC"
                    )}
                  </div>
                )}
              </div>

              <div className="invoice-meta">
                <div>
                  <span>ISSUED</span>
                  <strong>{issueDate}</strong>
                </div>

                <div>
                  <span>DUE DATE</span>
                  <strong>{dueDate}</strong>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong className="paid">Pending</strong>
                </div>
              </div>

              <div className="addresses">
                <div>
                  <span>FROM</span>
                  <strong>{companyName}</strong>
                  <p>
                    21 Business Avenue
                    <br />
                    Warsaw, Poland
                    <br />
                    +48 123 456 789
                  </p>
                </div>

                <div>
                  <span>BILLED TO</span>
                  <strong>{clientName}</strong>
                  <p>
                    88 Innovation Street
                    <br />
                    Krakow, Poland
                    <br />
                    billing@northstar.com
                  </p>
                </div>
              </div>

              <div className="invoice-items">
                <div className="table-header">
                  <span>DESCRIPTION</span>
                  <span>QTY</span>
                  <span>RATE</span>
                  <span>TOTAL</span>
                </div>

                <div className="invoice-item">
                  <div>
                    <strong>{itemDescription}</strong>
                    <span>UI design & development</span>
                  </div>

                  <span>1</span>
                  <span>{formatAmount(itemRate)}</span>
                  <strong>{formatAmount(itemRate)}</strong>
                </div>

                <div className="invoice-item">
                  <div>
                    <strong>SEO optimization</strong>
                    <span>Technical optimization</span>
                  </div>

                  <span>1</span>
                  <span>$250</span>
                  <strong>{formatAmount("250")}</strong>
                </div>
              </div>

              <div className="invoice-bottom">
                <div className="payment-note">
                  <span>PAYMENT TERMS</span>
                  <p>
                    Payment is due within 30 days of the invoice date.
                  </p>
                </div>

                <div className="totals">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      {formatAmount(
                        subtotal.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Tax (5%)</span>
                    <strong>
                      {formatAmount(
                        tax.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })
                    )}
                    </strong>
                  </div>

                  <div className="total">
                    <span>Total</span>
                    <strong style={{ color: secondaryColor }}>
                      {formatAmount(total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })
                      )}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="invoice-payment-methods">
                <div>
                  <span className="payment-label">PAYMENT METHODS</span>

                  <div className="payment-method-list">
                    {paymentMethods.bank && <span>Bank transfer</span>}
                    {paymentMethods.card && <span>Credit / debit card</span>}
                    {paymentMethods.paypal && <span>PayPal</span>}
                  </div>
                </div>
              </div>

              <div className="invoice-footer">
                <span>Thank you for your business.</span>
                <span>invoice-studio</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;