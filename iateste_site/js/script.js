// ======================================================
// Sabor & Código - JavaScript principal
// ======================================================

// Filtro de categorias do cardápio
const filterButtons = document.querySelectorAll("[data-filter]");
const groups = document.querySelectorAll("[data-category-group]");

if (filterButtons.length && groups.length) {
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      groups.forEach(group => {
        group.style.display =
          filter === "todos" || group.dataset.categoryGroup === filter
            ? ""
            : "none";
      });
    });
  });
}

// Formulário de reserva
const form = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const toast = document.getElementById("toast");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;
    const pessoas = document.getElementById("pessoas").value;

    if (!nome || !data || !horario || !pessoas) {
      if (formMessage) {
        formMessage.textContent =
          "Preencha todos os campos obrigatórios.";
      }
      return;
    }

    const dataFormatada =
      new Date(data + "T00:00:00").toLocaleDateString("pt-BR");

    if (formMessage) {
      formMessage.textContent =
        `Reserva solicitada para ${nome}: ${dataFormatada} às ${horario}, ${pessoas}.`;
    }

    if (toast) {
      toast.textContent = "Solicitação de reserva registrada!";
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3500);
    }
  });
}

// Impede seleção de datas anteriores ao dia atual
const dateInput = document.getElementById("data");

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${yyyy}-${mm}-${dd}`;
}
