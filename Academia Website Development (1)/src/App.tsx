import { useState } from "react";

// ---------- TYPES ----------

interface Modalidade {
  nome: string;
  mensalidade: number;
  img?: string;
  horario?: string;
  professores?: string;
}

interface Pagamento {
  valor: number;
  data: string;
  forma: string;
  status: "Pago" | "Pendente" | "Atrasado";
}

interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  modalidades: Modalidade[];
  status: "Ativo" | "Inativo";
  pagamentos: Pagamento[];
}

// ---------- INITIAL DATA ----------

const MODALIDADES: Modalidade[] = [
  { nome: "Muay Thai", mensalidade: 180, img: "https://images.unsplash.com/photo-1729673516991-b0bce1f60d27?w=600&h=400&fit=crop&auto=format", horario: "Segunda a Sexta às 19h", professores: "Andre Silva" },
  { nome: "Krav Maga Masculino", mensalidade: 190, img: "/src/imports/image.png", horario: "Terça e Quinta às 20h", professores: "Andre Silva" },
  { nome: "Krav Maga Feminino", mensalidade: 190, img: "/src/imports/image.png", horario: "Segunda e Quarta às 19h", professores: "Marcia Brasil" },
  { nome: "Musculação", mensalidade: 99.90, img: "https://images.unsplash.com/photo-1722925541142-5db2668ca492?w=600&h=400&fit=crop&auto=format", horario: "Segunda a Sábado · 06:00 às 22:00", professores: "Rafael Costa" },
  { nome: "CrossFit", mensalidade: 249, img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=400&fit=crop&auto=format", horario: "Seg, Qua e Sex · 07:00–08:00 e 18:00–19:00", professores: "Lucas Ferreira" },
  { nome: "Funcional", mensalidade: 149, img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=400&fit=crop&auto=format", horario: "Terça e Quinta · 18:00 às 19:00", professores: "Mariana Alves" },
  { nome: "Pilates", mensalidade: 280, img: "https://images.unsplash.com/photo-1715780463401-b9ef0567943e?w=600&h=400&fit=crop&auto=format", horario: "Seg, Qua e Sex · 08:00 às 09:00", professores: "Fernanda Rocha" },
  { nome: "Yoga", mensalidade: 150, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format", horario: "Terça e Quinta · 07:00 às 08:00", professores: "Juliana Martins" },
  { nome: "Zumba", mensalidade: 99, img: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&h=400&fit=crop&auto=format", horario: "Segunda e Quarta · 19:00 às 20:00", professores: "Camila Souza" },
  { nome: "Spinning", mensalidade: 139, img: "https://images.unsplash.com/photo-1625594755684-a73285a64f66?w=600&h=400&fit=crop&auto=format", horario: "Ter e Qui · 06:30–07:30 e 19:00–20:00", professores: "Diego Santos" },
  { nome: "Natação", mensalidade: 220, img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop&auto=format", horario: "Seg, Qua e Sex · 17:00 às 18:00", professores: "Gabriel Oliveira" },
  { nome: "Jiu-Jitsu", mensalidade: 180, img: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?w=600&h=400&fit=crop&auto=format", horario: "Terça e Quinta · 20:00 às 21:30", professores: "Ricardo Lima" },
  { nome: "Boxe", mensalidade: 170, img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop&auto=format", horario: "Seg, Qua e Sex · 19:00 às 20:00", professores: "Bruno Almeida" },
  { nome: "Personal Trainer", mensalidade: 800, img: "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?w=600&h=400&fit=crop&auto=format", horario: "Segunda a Sábado · Agendamento personalizado", professores: "Felipe Rodrigues" },
];

const today = new Date().toISOString().slice(0, 10);
const tenDaysAgo = new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10);

const INITIAL_ALUNOS: Aluno[] = [
  {
    id: 1,
    nome: "João Pedro",
    cpf: "111.111.111-11",
    telefone: "(51) 99999-0001",
    endereco: "Rua A, 100",
    modalidades: [MODALIDADES[0]],
    status: "Ativo",
    pagamentos: [{ valor: 120, data: today, forma: "PIX", status: "Pago" }],
  },
  {
    id: 2,
    nome: "Maria Clara",
    cpf: "222.222.222-22",
    telefone: "(51) 99999-0002",
    endereco: "Rua B, 200",
    modalidades: [MODALIDADES[6], MODALIDADES[3]],
    status: "Ativo",
    pagamentos: [{ valor: 240, data: tenDaysAgo, forma: "Dinheiro", status: "Atrasado" }],
  },
  {
    id: 3,
    nome: "Lucas Ferreira",
    cpf: "333.333.333-33",
    telefone: "(51) 99999-0003",
    endereco: "Av. C, 300",
    modalidades: [MODALIDADES[4], MODALIDADES[12]],
    status: "Ativo",
    pagamentos: [{ valor: 270, data: today, forma: "PIX", status: "Pago" }],
  },
  {
    id: 4,
    nome: "Ana Beatriz",
    cpf: "444.444.444-44",
    telefone: "(51) 99999-0004",
    endereco: "Rua D, 400",
    modalidades: [MODALIDADES[7]],
    status: "Ativo",
    pagamentos: [],
  },
  {
    id: 5,
    nome: "Rafael Souza",
    cpf: "555.555.555-55",
    telefone: "(51) 99999-0005",
    endereco: "Av. E, 500",
    modalidades: [MODALIDADES[11], MODALIDADES[0]],
    status: "Inativo",
    pagamentos: [{ valor: 250, data: tenDaysAgo, forma: "Dinheiro", status: "Atrasado" }],
  },
];

// ---------- HELPERS ----------

function fmt(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR");
}

function totalMensalidades(a: Aluno) {
  return a.modalidades.reduce((s, m) => s + m.mensalidade, 0);
}

function alunoStatusPag(a: Aluno): "Pago" | "Pendente" | "Atrasado" {
  if (a.pagamentos.length === 0) return "Pendente";
  if (a.pagamentos.some((p) => p.status === "Atrasado")) return "Atrasado";
  if (a.pagamentos.some((p) => p.status === "Pendente")) return "Pendente";
  return "Pago";
}

// ---------- NAV ----------

type View = "dashboard" | "alunos" | "modalidades" | "pagamentos" | "vencimentos" | "relatorios" | "banco" | "sobre";

const NAV_ITEMS: { id: View; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "alunos", label: "Alunos", icon: "👥" },
  { id: "modalidades", label: "Modalidades", icon: "🥊" },
  { id: "pagamentos", label: "Pagamentos", icon: "💳" },
  { id: "vencimentos", label: "Vencimentos", icon: "📅" },
  { id: "relatorios", label: "Relatórios", icon: "📈" },
  { id: "banco", label: "Banco de Dados", icon: "🗃️" },
  { id: "sobre", label: "Sobre o Sistema", icon: "ℹ️" },
];

// ---------- STATUS BADGE ----------

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pago: "bg-green-500/15 text-green-400 border-green-500/30",
    Pendente: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Atrasado: "bg-red-500/15 text-red-400 border-red-500/30",
    Ativo: "bg-green-500/15 text-green-400 border-green-500/30",
    Inativo: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border ${map[status] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
    >
      {status}
    </span>
  );
}

// ---------- STAT CARD ----------

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5 flex flex-col gap-3">
      <span className="text-xs font-mono text-[#6b7280] uppercase tracking-widest">{label}</span>
      <span
        className="font-['Barlow_Condensed'] text-3xl font-bold tracking-tight"
        style={{ color: accent ?? "#f0f0f0" }}
      >
        {value}
      </span>
      {sub && <span className="text-xs text-[#6b7280]">{sub}</span>}
    </div>
  );
}

// ---------- MODAL ----------

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#141414] border border-[#2a2a2a] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <h2 className="font-['Barlow_Condensed'] text-2xl font-bold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-white text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ---------- INPUT ----------

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#e8384a] transition-colors"
      />
    </div>
  );
}

// ---------- DASHBOARD ----------

function Dashboard({ alunos }: { alunos: Aluno[] }) {
  let totalRecebido = 0,
    totalPendente = 0,
    totalAtrasado = 0;
  let inadimplentes = 0;

  for (const a of alunos) {
    let emAtraso = false;
    for (const p of a.pagamentos) {
      if (p.status === "Pago") totalRecebido += p.valor;
      else if (p.status === "Pendente") totalPendente += p.valor;
      else if (p.status === "Atrasado") {
        totalAtrasado += p.valor;
        emAtraso = true;
      }
    }
    if (emAtraso) inadimplentes++;
  }

  const ativos = alunos.filter((a) => a.status === "Ativo").length;
  const receitaEsperada = alunos
    .filter((a) => a.status === "Ativo")
    .reduce((s, a) => s + totalMensalidades(a), 0);

  const recentes = [...alunos]
    .flatMap((a) => a.pagamentos.map((p) => ({ ...p, alunoNome: a.nome })))
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 6);

  const modCount: Record<string, number> = {};
  for (const a of alunos) {
    for (const m of a.modalidades) {
      modCount[m.nome] = (modCount[m.nome] ?? 0) + 1;
    }
  }
  const topMods = Object.entries(modCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxMod = topMods[0]?.[1] ?? 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">Visão geral da academia</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Alunos Ativos" value={String(ativos)} sub={`${alunos.length} total`} />
        <StatCard label="Receita Recebida" value={fmt(totalRecebido)} accent="#22c55e" />
        <StatCard label="Em Atraso" value={fmt(totalAtrasado)} accent="#e8384a" sub={`${inadimplentes} inadimplentes`} />
        <StatCard label="Receita Esperada" value={fmt(receitaEsperada)} sub="mensalidades ativas" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="font-['Barlow_Condensed'] text-lg font-bold mb-4 text-white tracking-wide uppercase">
            Pagamentos Recentes
          </h3>
          {recentes.length === 0 ? (
            <p className="text-[#6b7280] text-sm">Nenhum pagamento registrado.</p>
          ) : (
            <div className="space-y-2">
              {recentes.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-[#1e1e1e] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{p.alunoNome}</p>
                    <p className="text-xs text-[#6b7280] font-mono">
                      {fmtDate(p.data)} · {p.forma}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-white">{fmt(p.valor)}</span>
                    <Badge status={p.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="font-['Barlow_Condensed'] text-lg font-bold mb-4 text-white tracking-wide uppercase">
            Modalidades Populares
          </h3>
          <div className="space-y-3">
            {topMods.map(([nome, qtd]) => (
              <div key={nome} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{nome}</span>
                  <span className="font-mono text-[#6b7280]">{qtd} aluno{qtd !== 1 ? "s" : ""}</span>
                </div>
                <div className="h-1.5 bg-[#1c1c1c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e8384a] rounded-full transition-all"
                    style={{ width: `${(qtd / maxMod) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- ALUNOS ----------

function AlunosView({
  alunos,
  setAlunos,
}: {
  alunos: Aluno[];
  setAlunos: React.Dispatch<React.SetStateAction<Aluno[]>>;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "Ativo" | "Inativo">("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState<Aluno | null>(null);
  const [viewAluno, setViewAluno] = useState<Aluno | null>(null);
  const [nextId, setNextId] = useState(100);

  const [form, setForm] = useState({ nome: "", cpf: "", telefone: "", endereco: "" });
  const [selMods, setSelMods] = useState<Modalidade[]>([]);

  const filtered = alunos.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q || a.nome.toLowerCase().includes(q) || a.cpf.includes(q) || a.telefone.includes(q);
    const matchStatus = !filterStatus || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openAdd() {
    setForm({ nome: "", cpf: "", telefone: "", endereco: "" });
    setSelMods([]);
    setModalAdd(true);
  }

  function openEdit(a: Aluno) {
    setForm({ nome: a.nome, cpf: a.cpf, telefone: a.telefone, endereco: a.endereco });
    setSelMods([...a.modalidades]);
    setModalEdit(a);
  }

  function saveAdd() {
    if (!form.nome.trim()) return;
    const novo: Aluno = {
      id: nextId,
      nome: form.nome,
      cpf: form.cpf,
      telefone: form.telefone,
      endereco: form.endereco,
      modalidades: selMods,
      status: "Ativo",
      pagamentos: [],
    };
    setAlunos((prev) => [...prev, novo]);
    setNextId((n) => n + 1);
    setModalAdd(false);
  }

  function saveEdit() {
    if (!modalEdit) return;
    setAlunos((prev) =>
      prev.map((a) =>
        a.id === modalEdit.id
          ? { ...a, nome: form.nome, cpf: form.cpf, telefone: form.telefone, endereco: form.endereco, modalidades: selMods }
          : a
      )
    );
    setModalEdit(null);
  }

  function toggleStatus(id: number) {
    setAlunos((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "Ativo" ? "Inativo" : "Ativo" } : a
      )
    );
  }

  function deleteAluno(id: number) {
    if (!confirm("Confirmar exclusão do aluno?")) return;
    setAlunos((prev) => prev.filter((a) => a.id !== id));
  }

  function toggleMod(m: Modalidade) {
    setSelMods((prev) =>
      prev.find((x) => x.nome === m.nome) ? prev.filter((x) => x.nome !== m.nome) : [...prev, m]
    );
  }

  const FormModal = ({ onSave, title }: { onSave: () => void; title: string }) => (
    <div className="space-y-4">
      <Field label="Nome" value={form.nome} onChange={(v) => setForm((f) => ({ ...f, nome: v }))} placeholder="Nome completo" />
      <Field label="CPF" value={form.cpf} onChange={(v) => setForm((f) => ({ ...f, cpf: v }))} placeholder="000.000.000-00" />
      <Field label="Telefone" value={form.telefone} onChange={(v) => setForm((f) => ({ ...f, telefone: v }))} placeholder="(51) 99999-0000" />
      <Field label="Endereço" value={form.endereco} onChange={(v) => setForm((f) => ({ ...f, endereco: v }))} placeholder="Rua, número" />
      <div>
        <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest block mb-2">Modalidades</label>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
          {MODALIDADES.map((m) => {
            const sel = !!selMods.find((x) => x.nome === m.nome);
            return (
              <button
                key={m.nome}
                onClick={() => toggleMod(m)}
                className={`text-left px-3 py-2 rounded-lg text-xs border transition-colors ${sel ? "bg-[#e8384a]/15 border-[#e8384a]/50 text-[#e8384a]" : "bg-[#1c1c1c] border-[#2a2a2a] text-[#6b7280] hover:border-[#444]"}`}
              >
                {m.nome}
                <br />
                <span className="font-mono">{fmt(m.mensalidade)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={onSave}
        className="w-full bg-[#e8384a] hover:bg-[#c42d3e] text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
      >
        {title}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
            Alunos
          </h1>
          <p className="text-[#6b7280] text-sm mt-1">{alunos.length} cadastrados</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#e8384a] hover:bg-[#c42d3e] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          + Novo Aluno
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, CPF ou telefone..."
          className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#e8384a] transition-colors"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "" | "Ativo" | "Inativo")}
          className="bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8384a] transition-colors"
        >
          <option value="">Todos os status</option>
          <option value="Ativo">Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {["ID", "Nome", "Modalidades", "Mensalidade", "Situação", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-mono text-[#6b7280] uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-[#6b7280]">
                  Nenhum aluno encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors last:border-0"
                >
                  <td className="px-5 py-3.5 font-mono text-[#6b7280] text-xs">{a.id}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setViewAluno(a)}
                      className="font-medium text-white hover:text-[#e8384a] transition-colors text-left"
                    >
                      {a.nome}
                    </button>
                    <p className="text-xs text-[#6b7280] font-mono">{a.cpf}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[#a0a0a0]">
                    {a.modalidades.length === 0
                      ? <span className="text-[#444]">—</span>
                      : a.modalidades.map((m) => m.nome).join(", ")}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-white">{fmt(totalMensalidades(a))}</td>
                  <td className="px-5 py-3.5">
                    <Badge status={alunoStatusPag(a)} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge status={a.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(a)}
                        className="p-1.5 text-[#6b7280] hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title="Editar"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => toggleStatus(a.id)}
                        className="p-1.5 text-[#6b7280] hover:text-yellow-400 hover:bg-[#2a2a2a] rounded transition-colors text-xs"
                        title="Alternar status"
                      >
                        ⇆
                      </button>
                      <button
                        onClick={() => deleteAluno(a.id)}
                        className="p-1.5 text-[#6b7280] hover:text-[#e8384a] hover:bg-[#2a2a2a] rounded transition-colors"
                        title="Excluir"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalAdd && (
        <Modal title="Cadastrar Aluno" onClose={() => setModalAdd(false)}>
          <FormModal onSave={saveAdd} title="Cadastrar" />
        </Modal>
      )}

      {modalEdit && (
        <Modal title={`Editar — ${modalEdit.nome}`} onClose={() => setModalEdit(null)}>
          <FormModal onSave={saveEdit} title="Salvar Alterações" />
        </Modal>
      )}

      {viewAluno && (
        <Modal title={viewAluno.nome} onClose={() => setViewAluno(null)}>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["CPF", viewAluno.cpf],
                ["Telefone", viewAluno.telefone],
                ["Endereço", viewAluno.endereco],
                ["Status", viewAluno.status],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-0.5">{k}</p>
                  <p className="text-white">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-2">Modalidades</p>
              <div className="flex flex-wrap gap-2">
                {viewAluno.modalidades.length === 0 ? (
                  <span className="text-[#444]">Nenhuma</span>
                ) : (
                  viewAluno.modalidades.map((m) => (
                    <span key={m.nome} className="bg-[#1c1c1c] border border-[#2a2a2a] px-3 py-1 rounded-lg text-xs text-white">
                      {m.nome} · <span className="font-mono">{fmt(m.mensalidade)}</span>
                    </span>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-2">
                Mensalidade total — <span className="text-white">{fmt(totalMensalidades(viewAluno))}</span>
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-2">Histórico de Pagamentos</p>
              {viewAluno.pagamentos.length === 0 ? (
                <p className="text-[#444]">Nenhum registro.</p>
              ) : (
                <div className="space-y-2">
                  {viewAluno.pagamentos.map((p, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#1c1c1c] rounded-lg px-3 py-2">
                      <span className="text-white font-mono">{fmt(p.valor)}</span>
                      <span className="text-[#6b7280] text-xs">{fmtDate(p.data)} · {p.forma}</span>
                      <Badge status={p.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------- MODALIDADES ----------

function ModalidadesView({ alunos }: { alunos: Aluno[] }) {
  const [extras, setExtras] = useState<Record<string, { horario: string; professores: string }>>(() => {
    const init: Record<string, { horario: string; professores: string }> = {};
    for (const m of MODALIDADES) {
      init[m.nome] = { horario: m.horario ?? "", professores: m.professores ?? "" };
    }
    return init;
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ horario: "", professores: "" });

  const countFor = (nome: string) =>
    alunos.filter((a) => a.modalidades.some((m) => m.nome === nome)).length;

  function openEdit(nome: string) {
    setDraft({ ...extras[nome] });
    setEditing(nome);
  }

  function saveEdit() {
    if (!editing) return;
    setExtras((prev) => ({ ...prev, [editing]: draft }));
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          Modalidades
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">{MODALIDADES.length} modalidades disponíveis</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MODALIDADES.map((m) => {
          const qtd = countFor(m.nome);
          const info = extras[m.nome];
          return (
            <div
              key={m.nome}
              className="group bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#e8384a]/40 transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
            >
              <div className="relative h-40 bg-[#1c1c1c] overflow-hidden shrink-0">
                {m.img && (
                  <img
                    src={m.img}
                    alt={m.nome}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-['Barlow_Condensed'] text-2xl font-bold text-[#e8384a] leading-none">
                    {fmt(m.mensalidade)}
                  </span>
                  <p className="text-[10px] font-mono text-[#6b7280] uppercase tracking-widest">/ mês</p>
                </div>
                {qtd > 0 && (
                  <span className="absolute top-3 right-3 text-xs font-mono text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                    {qtd} aluno{qtd !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-['Barlow_Condensed'] text-lg font-bold text-white leading-tight">{m.nome}</p>
                  <button
                    onClick={() => openEdit(m.nome)}
                    className="text-[#444] hover:text-[#e8384a] transition-colors text-sm shrink-0 mt-0.5"
                    title="Editar informações"
                  >
                    ✎
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#e8384a] text-xs mt-0.5">⏰</span>
                    <p className="text-xs text-[#a0a0a0]">
                      {info.horario || <span className="text-[#444] italic">Horário não definido</span>}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#e8384a] text-xs mt-0.5">👤</span>
                    <p className="text-xs text-[#a0a0a0]">
                      {info.professores || <span className="text-[#444] italic">Professor não definido</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <Modal title={`Editar — ${editing}`} onClose={() => setEditing(null)}>
          <div className="space-y-4">
            <Field
              label="Horário"
              value={draft.horario}
              onChange={(v) => setDraft((d) => ({ ...d, horario: v }))}
              placeholder="Ex: Segunda a Sexta às 19h"
            />
            <Field
              label="Professores"
              value={draft.professores}
              onChange={(v) => setDraft((d) => ({ ...d, professores: v }))}
              placeholder="Ex: Andre Silva, Maria Brasil"
            />
            <button
              onClick={saveEdit}
              className="w-full bg-[#e8384a] hover:bg-[#c42d3e] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------- PAGAMENTOS ----------

function PagamentosView({
  alunos,
  setAlunos,
}: {
  alunos: Aluno[];
  setAlunos: React.Dispatch<React.SetStateAction<Aluno[]>>;
}) {
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [valor, setValor] = useState("");
  const [forma, setForma] = useState<"PIX" | "Dinheiro">("PIX");
  const [msg, setMsg] = useState("");

  const allPags = alunos.flatMap((a) =>
    a.pagamentos.map((p) => ({ ...p, alunoNome: a.nome, alunoId: a.id }))
  ).sort((a, b) => b.data.localeCompare(a.data));

  function registrar() {
    if (!selectedId || !valor) return;
    const valorNum = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNum) || valorNum <= 0) return;
    setAlunos((prev) =>
      prev.map((a) =>
        a.id === selectedId
          ? {
              ...a,
              pagamentos: [
                ...a.pagamentos,
                { valor: valorNum, data: today, forma, status: "Pago" as const },
              ],
            }
          : a
      )
    );
    setMsg(`Pagamento de ${fmt(valorNum)} registrado com sucesso!`);
    setValor("");
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          Pagamentos
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">Registrar e acompanhar pagamentos</p>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 space-y-4">
        <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide uppercase text-white">
          Registrar Pagamento
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest">Aluno</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : "")}
              className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8384a] transition-colors"
            >
              <option value="">Selecionar aluno...</option>
              {alunos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome} ({fmt(totalMensalidades(a))})
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest">Valor (R$)</label>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#e8384a] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest">Forma</label>
            <div className="flex gap-2">
              {(["PIX", "Dinheiro"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setForma(f)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${forma === f ? "bg-[#e8384a] border-[#e8384a] text-white" : "bg-[#1c1c1c] border-[#2a2a2a] text-[#6b7280] hover:border-[#444]"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={registrar}
          className="bg-[#e8384a] hover:bg-[#c42d3e] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          Registrar Pagamento
        </button>
        {msg && (
          <p className="text-green-400 text-sm font-mono bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
            ✓ {msg}
          </p>
        )}
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a2a]">
          <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide uppercase text-white">
            Histórico de Pagamentos
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {["Aluno", "Valor", "Data", "Forma", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-mono text-[#6b7280] uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPags.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-[#6b7280]">
                  Nenhum pagamento registrado.
                </td>
              </tr>
            ) : (
              allPags.map((p, i) => (
                <tr key={i} className="border-b border-[#1e1e1e] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-3.5 text-white">{p.alunoNome}</td>
                  <td className="px-5 py-3.5 font-mono text-white">{fmt(p.valor)}</td>
                  <td className="px-5 py-3.5 font-mono text-[#6b7280] text-xs">{fmtDate(p.data)}</td>
                  <td className="px-5 py-3.5 text-[#a0a0a0]">{p.forma}</td>
                  <td className="px-5 py-3.5"><Badge status={p.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- VENCIMENTOS ----------

function VencimentosView({ alunos }: { alunos: Aluno[] }) {
  const grupos = {
    Atrasado: alunos.filter((a) => alunoStatusPag(a) === "Atrasado"),
    Pendente: alunos.filter((a) => alunoStatusPag(a) === "Pendente"),
    Pago: alunos.filter((a) => alunoStatusPag(a) === "Pago"),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          Controle de Vencimentos
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">Situação de pagamentos por aluno</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Em Atraso" value={String(grupos.Atrasado.length)} accent="#e8384a" />
        <StatCard label="Pendente" value={String(grupos.Pendente.length)} accent="#f59e0b" />
        <StatCard label="Em Dia" value={String(grupos.Pago.length)} accent="#22c55e" />
      </div>

      {(["Atrasado", "Pendente", "Pago"] as const).map((status) => {
        const list = grupos[status];
        if (list.length === 0) return null;
        return (
          <div key={status} className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center gap-3">
              <Badge status={status} />
              <span className="font-['Barlow_Condensed'] text-lg font-bold text-white tracking-wide">
                {list.length} aluno{list.length !== 1 ? "s" : ""}
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e]">
                  {["Aluno", "Modalidades", "Mensalidade", "Último Pagamento"].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-mono text-[#6b7280] uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((a) => {
                  const ultimo = a.pagamentos[a.pagamentos.length - 1];
                  return (
                    <tr key={a.id} className="border-b border-[#1e1e1e] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-white font-medium">{a.nome}</p>
                        <p className="text-xs text-[#6b7280] font-mono">{a.telefone}</p>
                      </td>
                      <td className="px-5 py-3.5 text-[#a0a0a0] text-xs">
                        {a.modalidades.map((m) => m.nome).join(", ") || "—"}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-white">{fmt(totalMensalidades(a))}</td>
                      <td className="px-5 py-3.5 text-xs font-mono text-[#6b7280]">
                        {ultimo ? fmtDate(ultimo.data) : "Nunca"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

// ---------- RELATORIOS ----------

function RelatoriosView({ alunos }: { alunos: Aluno[] }) {
  let totalRecebido = 0, totalPendente = 0, totalAtrasado = 0;
  for (const a of alunos) {
    for (const p of a.pagamentos) {
      if (p.status === "Pago") totalRecebido += p.valor;
      else if (p.status === "Pendente") totalPendente += p.valor;
      else if (p.status === "Atrasado") totalAtrasado += p.valor;
    }
  }

  const totalGeral = totalRecebido + totalPendente + totalAtrasado || 1;
  const modCount: Record<string, { count: number; receita: number }> = {};
  for (const a of alunos) {
    for (const m of a.modalidades) {
      if (!modCount[m.nome]) modCount[m.nome] = { count: 0, receita: 0 };
      modCount[m.nome].count++;
      modCount[m.nome].receita += m.mensalidade;
    }
  }
  const modStats = Object.entries(modCount)
    .sort((a, b) => b[1].count - a[1].count);

  const ativosCount = alunos.filter((a) => a.status === "Ativo").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          Relatórios
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">Análise financeira e operacional</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Alunos" value={String(alunos.length)} sub={`${ativosCount} ativos`} />
        <StatCard label="Total Recebido" value={fmt(totalRecebido)} accent="#22c55e" />
        <StatCard label="A Receber" value={fmt(totalPendente)} accent="#f59e0b" />
        <StatCard label="Em Atraso" value={fmt(totalAtrasado)} accent="#e8384a" />
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
        <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide uppercase text-white mb-4">
          Distribuição de Receita
        </h2>
        <div className="space-y-3">
          {[
            { label: "Recebido", value: totalRecebido, color: "#22c55e" },
            { label: "Pendente", value: totalPendente, color: "#f59e0b" },
            { label: "Atrasado", value: totalAtrasado, color: "#e8384a" },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">{item.label}</span>
                <span className="font-mono text-white">{fmt(item.value)}</span>
              </div>
              <div className="h-2 bg-[#1c1c1c] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(item.value / totalGeral) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <p className="text-xs text-[#6b7280] font-mono">
                {((item.value / totalGeral) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a2a]">
          <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide uppercase text-white">
            Modalidades — Alunos e Receita
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {["Modalidade", "Alunos", "Receita Mensal"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-mono text-[#6b7280] uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modStats.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-[#6b7280]">
                  Nenhuma modalidade em uso.
                </td>
              </tr>
            ) : (
              modStats.map(([nome, data]) => (
                <tr key={nome} className="border-b border-[#1e1e1e] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-3.5 text-white">{nome}</td>
                  <td className="px-5 py-3.5 font-mono text-[#a0a0a0]">{data.count}</td>
                  <td className="px-5 py-3.5 font-mono text-white">{fmt(data.receita)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- BANCO DE DADOS ----------

function BancoDeDadosView({ alunos }: { alunos: Aluno[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          🗃️ Banco de Dados
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">Visualização das tabelas em memória</p>
      </div>

      {/* Tabela Alunos */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center gap-2">
          <span className="text-[#e8384a] font-mono text-xs">TABLE</span>
          <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide text-white uppercase">aluno</h2>
          <span className="ml-auto font-mono text-xs text-[#6b7280]">{alunos.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#111]">
                {["id", "nome", "cpf", "telefone", "endereco", "status"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-[#e8384a] uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alunos.map((a) => (
                <tr key={a.id} className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#1a1a1a]">
                  <td className="px-5 py-2.5 text-[#6b7280]">{a.id}</td>
                  <td className="px-5 py-2.5 text-white">{a.nome}</td>
                  <td className="px-5 py-2.5 text-[#a0a0a0]">{a.cpf}</td>
                  <td className="px-5 py-2.5 text-[#a0a0a0]">{a.telefone}</td>
                  <td className="px-5 py-2.5 text-[#a0a0a0]">{a.endereco}</td>
                  <td className="px-5 py-2.5"><Badge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela Modalidades */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center gap-2">
          <span className="text-[#e8384a] font-mono text-xs">TABLE</span>
          <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide text-white uppercase">modalidade</h2>
          <span className="ml-auto font-mono text-xs text-[#6b7280]">{MODALIDADES.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#111]">
                {["nome", "mensalidade"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-[#e8384a] uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODALIDADES.map((m) => (
                <tr key={m.nome} className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#1a1a1a]">
                  <td className="px-5 py-2.5 text-white">{m.nome}</td>
                  <td className="px-5 py-2.5 text-[#22c55e]">{fmt(m.mensalidade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela Pagamentos */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center gap-2">
          <span className="text-[#e8384a] font-mono text-xs">TABLE</span>
          <h2 className="font-['Barlow_Condensed'] text-xl font-bold tracking-wide text-white uppercase">pagamento</h2>
          <span className="ml-auto font-mono text-xs text-[#6b7280]">
            {alunos.reduce((s, a) => s + a.pagamentos.length, 0)} registros
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#111]">
                {["aluno_id", "aluno_nome", "valor", "data", "forma", "status"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-[#e8384a] uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alunos.flatMap((a) =>
                a.pagamentos.map((p, i) => (
                  <tr key={`${a.id}-${i}`} className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#1a1a1a]">
                    <td className="px-5 py-2.5 text-[#6b7280]">{a.id}</td>
                    <td className="px-5 py-2.5 text-white">{a.nome}</td>
                    <td className="px-5 py-2.5 text-[#22c55e]">{fmt(p.valor)}</td>
                    <td className="px-5 py-2.5 text-[#a0a0a0]">{fmtDate(p.data)}</td>
                    <td className="px-5 py-2.5 text-[#a0a0a0]">{p.forma}</td>
                    <td className="px-5 py-2.5"><Badge status={p.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------- SOBRE ----------

function SobreView() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-bold tracking-tight text-white">
          ℹ️ Sobre o Sistema
        </h1>
        <p className="text-[#6b7280] text-sm mt-1">Informações do sistema e contatos</p>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <div className="h-2 bg-[#e8384a]" />
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#e8384a] rounded-xl flex items-center justify-center font-['Barlow_Condensed'] font-bold text-2xl text-white">
              AS
            </div>
            <div>
              <p className="font-['Barlow_Condensed'] text-2xl font-bold text-white">Academia Andre Silva</p>
              <p className="text-[#6b7280] text-sm">Sistema de Gestão Esportiva</p>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-6 grid grid-cols-2 gap-6">
            {[
              { label: "Versão", value: "2.0 MVP" },
              { label: "Plataforma", value: "Web React" },
              { label: "Autor", value: "Dimitrius Gabineski" },
              { label: "Linguagem original", value: "Java Console" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#2a2a2a] pt-6 space-y-3">
            <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-3">Contatos</p>
            <a
              href="https://wa.me/555184742517?text=Olá%2C%20gostaria%20de%20mais%20informações%20sobre%20a%20Academia%20Andre%20Silva!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#25d366]/50 hover:bg-[#25d366]/5 rounded-xl px-4 py-3 transition-colors group"
            >
              <span className="text-2xl">💬</span>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Professor Andre Silva</p>
                <p className="text-[#6b7280] font-mono text-xs">(51) 98474-2517</p>
              </div>
              <span className="text-xs font-semibold text-[#25d366] opacity-0 group-hover:opacity-100 transition-opacity">
                Abrir WhatsApp ↗
              </span>
            </a>
            <a
              href="https://wa.me/5551984610503?text=Olá%2C%20gostaria%20de%20mais%20informações%20sobre%20a%20Academia%20Andre%20Silva!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#25d366]/50 hover:bg-[#25d366]/5 rounded-xl px-4 py-3 transition-colors group"
            >
              <span className="text-2xl">💬</span>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Professora Marcia Brasil</p>
                <p className="text-[#6b7280] font-mono text-xs">(51) 8461-0503</p>
              </div>
              <span className="text-xs font-semibold text-[#25d366] opacity-0 group-hover:opacity-100 transition-opacity">
                Abrir WhatsApp ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- APP ----------

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [alunos, setAlunos] = useState<Aluno[]>(INITIAL_ALUNOS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const VIEWS: Record<View, React.ReactNode> = {
    dashboard: <Dashboard alunos={alunos} />,
    alunos: <AlunosView alunos={alunos} setAlunos={setAlunos} />,
    modalidades: <ModalidadesView alunos={alunos} />,
    pagamentos: <PagamentosView alunos={alunos} setAlunos={setAlunos} />,
    vencimentos: <VencimentosView alunos={alunos} />,
    relatorios: <RelatoriosView alunos={alunos} />,
    banco: <BancoDeDadosView alunos={alunos} />,
    sobre: <SobreView />,
  };

  return (
    <div className="flex h-full bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col bg-[#0f0f0f] border-r border-[#1e1e1e] w-60
          transition-transform duration-200
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#e8384a] rounded-lg flex items-center justify-center text-white font-['Barlow_Condensed'] font-bold text-sm">
              AS
            </div>
            <div>
              <p className="font-['Barlow_Condensed'] font-bold text-white text-sm leading-tight">
                ACADEMIA
              </p>
              <p className="font-['Barlow_Condensed'] font-bold text-[#e8384a] text-sm leading-tight tracking-widest">
                ANDRE SILVA
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                ${view === item.id
                  ? "bg-[#e8384a]/15 text-[#e8384a]"
                  : "text-[#6b7280] hover:text-white hover:bg-[#1a1a1a]"
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e1e1e]">
          <p className="text-[#3a3a3a] text-xs font-mono">v2.0 MVP</p>
          <p className="text-[#3a3a3a] text-xs font-mono">Dimitrius Gabineski</p>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-[#1e1e1e] bg-[#0a0a0a] lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#6b7280] hover:text-white transition-colors text-xl"
          >
            ☰
          </button>
          <span className="font-['Barlow_Condensed'] font-bold text-white tracking-wide">
            ACADEMIA ANDRE SILVA
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {VIEWS[view]}
        </main>
      </div>
    </div>
  );
}
