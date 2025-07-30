window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 1200);
};

document.getElementById("collabForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const insta = formData.get("insta").trim();
  const phone = formData.get("phone").trim();
  const address = formData.get("address").trim();

  const links = [];
  for (let i = 1; i <= 8; i++) {
    links.push(formData.get(`link${i}`).trim());
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lineHeight = 8;
  let y = 20;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("COLLABORATION AGREEMENT", 105, y, { align: "center" });

  y += lineHeight * 2;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Clothing Brand: YourBrand Inc.", 20, y); y += lineHeight;
  doc.text("Website: www.yourbrand.com", 20, y); y += lineHeight;
  doc.text("Instagram: @yourbrand", 20, y); y += lineHeight * 2;

  doc.setFont("helvetica", "bold");
  doc.text("Influencer Details", 20, y); y += lineHeight;
  doc.setFont("helvetica", "normal");
  doc.text(`Full Name: ${name}`, 20, y); y += lineHeight;
  doc.text(`Email Address: ${email}`, 20, y); y += lineHeight;
  doc.text(`Instagram Handle: ${insta}`, 20, y); y += lineHeight;
  doc.text(`Phone Number: ${phone}`, 20, y); y += lineHeight;
  doc.text(`Delivery Address: ${address}`, 20, y); y += lineHeight * 2;

  doc.setFont("helvetica", "bold");
  doc.text("Selected Products (8 items):", 20, y); y += lineHeight;
  doc.setFont("helvetica", "normal");
  links.forEach((link, index) => {
    doc.text(`${index + 1}. ${link}`, 25, y);
    y += lineHeight;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  y += lineHeight;

  doc.setFont("helvetica", "bold");
  doc.text("Invoice Summary", 20, y); y += lineHeight;
  doc.setFont("helvetica", "normal");
  doc.text("Items Provided (8): $0", 25, y); y += lineHeight;
  doc.text("Delivery Fee (Risk Management): $200", 25, y); y += lineHeight;
  doc.text("------------------------------------------------------", 25, y); y += lineHeight;
  doc.setFont("helvetica", "bold");
  doc.text("Total Payable: $200", 25, y); y += lineHeight * 2;

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "By submitting this agreement, the influencer agrees to promote the brand’s products under the stated collaboration terms and conditions.",
    20, y,
    { maxWidth: 170 }
  );

  // Save file with safe name
  const safeName = name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  doc.save(`collaboration_agreement_${safeName}.pdf`);

  // Reset and show success UI
  form.reset();
  form.style.display = "none";
  document.getElementById("success").style.display = "block";

  // Set contact links
  const message = encodeURIComponent(
    `Hi YourBrand,\n\nMy name is ${name} and I have completed the collaboration form and downloaded the agreement. Please find my attachment below.`
  );

  document.getElementById("whatsappLink").href =
    `https://wa.me/YOUR_NUMBER?text=${message}`;
  document.getElementById("emailLink").href =
    `mailto:yourbrand@example.com?subject=Collaboration Submission from ${name}&body=${message}`;
});
