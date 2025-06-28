const token = "patQBXliPXWDCS60Q.40545a7b3ff6b6ebe3e001088c5ea9ba12e975e3eebfde59b8c132e5c675f0c8";
const baseId = "appNQL4G3kqHBCJIk";
const tableName = "جدول الرحلات";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("flight-form");
  const username = localStorage.getItem("flight_user") || "غير معروف";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fields = {
      "اسم الموظف": username
    };
    for (let [key, value] of formData.entries()) {
      fields[key] = value;
    }

    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fields })
    });

    if (response.ok) {
      alert("تم حفظ الرحلة بنجاح ✅");
      form.reset();
    } else {
      alert("حدث خطأ أثناء الحفظ ❌");
    }
  });
});
