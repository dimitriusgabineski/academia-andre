import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/*
 * ==================================================
 * SISTEMA DE GESTAO DE ACADEMIA - ACADEMIA ANDRE SILVA
 * MVP - Console Java
 * ==================================================
 *SModulos: Alunos, Modalidades, Pagamentos,
 *Controle de Vencimentos, Relatorios/Dashboard
 */

class AcademiaAndreSilva {

    // ---------- MODELOS ----------

    static class Modalidade {
        String nome;
        double mensalidade;

        Modalidade(String nome, double mensalidade) {
            this.nome = nome;
            this.mensalidade = mensalidade;
        }

        @Override
        public String toString() {
            return nome + " (R$ " + String.format("%.2f", mensalidade) + ")";
        }
    }

    static class Pagamento {
        double valor;
        LocalDate data;
        String formaPagamento;
        String status; // Pago, Pendente, Atrasado

        Pagamento(double valor, LocalDate data, String formaPagamento, String status) {
            this.valor = valor;
            this.data = data;
            this.formaPagamento = formaPagamento;
            this.status = status;
        }

        @Override
        public String toString() {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return "R$ " + String.format("%.2f", valor) + " | " + data.format(fmt)
                    + " | " + formaPagamento + " | " + status;
        }
    }

    static class Aluno {
        int id;
        String nome;
        String cpf;
        String telefone;
        String endereco;
        List<Modalidade> modalidades = new ArrayList<>();
        String status; // Ativo, Inativo
        List<Pagamento> pagamentos = new ArrayList<>();

        Aluno(int id, String nome, String cpf, String telefone, String endereco) {
            this.id = id;
            this.nome = nome;
            this.cpf = cpf;
            this.telefone = telefone;
            this.endereco = endereco;
            this.status = "Ativo";
        }

        double totalMensalidades() {
            double total = 0;
            for (Modalidade m : modalidades) {
                total += m.mensalidade;
            }
            return total;
        }
    }

    // ---------- DADOS EM MEMORIA (simulando banco de dados) ----------

    static List<Aluno> alunos = new ArrayList<>();
    static List<Modalidade> modalidadesDisponiveis = new ArrayList<>();
    static int proximoId = 1;
    static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        inicializarModalidades();
        inicializarAlunosExemplo();

        boolean rodando = true;
        while (rodando) {
            exibirMenu();
            int opcao = lerOpcaoInt();

            switch (opcao) {
                case 1 -> exibirDashboard();
                case 2 -> cadastrarAluno();
                case 3 -> consultarAlunos();
                case 4 -> editarAluno();
                case 5 -> excluirAluno();
                case 6 -> exibirModalidades();
                case 7 -> registrarPagamento();
                case 8 -> controleDeVencimentos();
                case 9 -> exibirRelatorios();
                case 10 -> exibirBancoDeDados();
                case 11 -> sobreOSistema();
                case 0 -> {
                    System.out.println("\nEncerrando o sistema. Ate logo!");
                    rodando = false;
                }
                default -> System.out.println("\nOpcao invalida! Tente novamente.");
            }
        }
        scanner.close();
    }

    // ---------- DADOS INICIAIS ----------

    static void inicializarModalidades() {
        modalidadesDisponiveis.add(new Modalidade("Muay Thai", 120.00));
        modalidadesDisponiveis.add(new Modalidade("Krav Maga Masculino", 130.00));
        modalidadesDisponiveis.add(new Modalidade("Krav Maga Feminino", 130.00));
        modalidadesDisponiveis.add(new Modalidade("Musculacao", 100.00));
        modalidadesDisponiveis.add(new Modalidade("CrossFit", 150.00));
        modalidadesDisponiveis.add(new Modalidade("Funcional", 110.00));
        modalidadesDisponiveis.add(new Modalidade("Pilates", 140.00));
        modalidadesDisponiveis.add(new Modalidade("Yoga", 110.00));
        modalidadesDisponiveis.add(new Modalidade("Zumba", 90.00));
        modalidadesDisponiveis.add(new Modalidade("Spinning", 100.00));
        modalidadesDisponiveis.add(new Modalidade("Natacao", 160.00));
        modalidadesDisponiveis.add(new Modalidade("Jiu-Jitsu", 130.00));
        modalidadesDisponiveis.add(new Modalidade("Boxe", 120.00));
        modalidadesDisponiveis.add(new Modalidade("Personal Trainer", 250.00));
    }

    static void inicializarAlunosExemplo() {
        Aluno a1 = new Aluno(proximoId++, "Joao Pedro", "111.111.111-11", "(51) 99999-0001", "Rua A, 100");
        a1.modalidades.add(modalidadesDisponiveis.get(0)); // Muay Thai
        a1.pagamentos.add(new Pagamento(120.00, LocalDate.now().minusDays(2), "PIX", "Pago"));
        alunos.add(a1);

        Aluno a2 = new Aluno(proximoId++, "Maria Clara", "222.222.222-22", "(51) 99999-0002", "Rua B, 200");
        a2.modalidades.add(modalidadesDisponiveis.get(6)); // Pilates
        a2.modalidades.add(modalidadesDisponiveis.get(3)); // Musculacao
        a2.pagamentos.add(new Pagamento(240.00, LocalDate.now().minusDays(10), "Dinheiro", "Atrasado"));
        alunos.add(a2);
    }

    // ---------- MENU ----------

    static void exibirMenu() {
        System.out.println("\n==================================================");
        System.out.println("        SISTEMA DE GESTAO DE ACADEMIA");
        System.out.println("           Academia Andre Silva");
        System.out.println("==================================================");
        System.out.println(" [1]  Dashboard");
        System.out.println(" [2]  Cadastrar Aluno");
        System.out.println(" [3]  Consultar Alunos");
        System.out.println(" [4]  Editar Aluno");
        System.out.println(" [5]  Excluir Aluno");
        System.out.println(" [6]  Modalidades");
        System.out.println(" [7]  Registrar Pagamento");
        System.out.println(" [8]  Controle de Vencimentos");
        System.out.println(" [9]  Relatorios");
        System.out.println(" [10] Banco de Dados");
        System.out.println(" [11] Sobre o Sistema");
        System.out.println(" [0]  Sair");
        System.out.println("==================================================");
        System.out.print("Opcao: ");
    }

    // ---------- 1. DASHBOARD ----------

    static void exibirDashboard() {
        double totalRecebido = 0, totalPendente = 0, totalAtrasado = 0;
        int inadimplentes = 0;

        for (Aluno a : alunos) {
            boolean emAtraso = false;
            for (Pagamento p : a.pagamentos) {
                switch (p.status) {
                    case "Pago" -> totalRecebido += p.valor;
                    case "Pendente" -> totalPendente += p.valor;
                    case "Atrasado" -> {
                        totalAtrasado += p.valor;
                        emAtraso = true;
                    }
                }
            }
            if (emAtraso) inadimplentes++;
        }

        System.out.println("\n--- DASHBOARD ---");
        System.out.println("Total de alunos ativos : " + alunos.size());
        System.out.println("Total recebido         : R$ " + String.format("%.2f", totalRecebido));
        System.out.println("Total pendente         : R$ " + String.format("%.2f", totalPendente));
        System.out.println("Total em atraso        : R$ " + String.format("%.2f", totalAtrasado));
        System.out.println("Alunos inadimplentes   : " + inadimplentes);
    }

    // ---------- 2. CADASTRAR ALUNO ----------

    static void cadastrarAluno() {
        System.out.println("\n--- CADASTRAR ALUNO ---");
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        System.out.print("CPF: ");
        String cpf = scanner.nextLine();
        System.out.print("Telefone: ");
        String telefone = scanner.nextLine();
        System.out.print("Endereco: ");
        String endereco = scanner.nextLine();

        Aluno novoAluno = new Aluno(proximoId++, nome, cpf, telefone, endereco);
        selecionarModalidades(novoAluno);

        alunos.add(novoAluno);
        System.out.println("\nAluno cadastrado com sucesso! ID: " + novoAluno.id);
    }

    // Permite selecionar MULTIPLAS modalidades para um aluno
    static void selecionarModalidades(Aluno aluno) {
        boolean adicionandoMais = true;
        while (adicionandoMais) {
            System.out.println("\nModalidades disponiveis:");
            for (int i = 0; i < modalidadesDisponiveis.size(); i++) {
                System.out.println(" [" + (i + 1) + "] " + modalidadesDisponiveis.get(i));
            }
            System.out.print("Escolha o numero da modalidade (0 para parar): ");
            int escolha = lerOpcaoInt();

            if (escolha == 0) {
                adicionandoMais = false;
            } else if (escolha >= 1 && escolha <= modalidadesDisponiveis.size()) {
                Modalidade m = modalidadesDisponiveis.get(escolha - 1);
                if (aluno.modalidades.contains(m)) {
                    System.out.println("Aluno ja possui essa modalidade.");
                } else {
                    aluno.modalidades.add(m);
                    System.out.println(m.nome + " adicionada!");
                }
                System.out.print("Deseja adicionar outra modalidade? (S/N): ");
                String resp = scanner.nextLine().trim().toUpperCase();
                if (!resp.equals("S")) {
                    adicionandoMais = false;
                }
            } else {
                System.out.println("Opcao invalida.");
            }
        }
    }

    // ---------- 3. CONSULTAR ALUNOS ----------

    static void consultarAlunos() {
        if (alunos.isEmpty()) {
            System.out.println("\nNenhum aluno cadastrado.");
            return;
        }

        System.out.println("\n--- CONSULTAR ALUNOS ---");
        System.out.println(" [1] Listar todos");
        System.out.println(" [2] Buscar por ID");
        System.out.println(" [3] Buscar por Nome");
        System.out.println(" [4] Buscar por Modalidade");
        System.out.print("Opcao: ");
        int opcao = lerOpcaoInt();

        switch (opcao) {
            case 1 -> alunos.forEach(AcademiaAndreSilva::imprimirAluno);
            case 2 -> {
                System.out.print("Digite o ID: ");
                int id = lerOpcaoInt();
                Aluno a = buscarAlunoPorId(id);
                if (a != null) imprimirAluno(a);
                else System.out.println("Aluno nao encontrado.");
            }
            case 3 -> {
                System.out.print("Digite o nome (ou parte): ");
                String nome = scanner.nextLine().toLowerCase();
                boolean achou = false;
                for (Aluno a : alunos) {
                    if (a.nome.toLowerCase().contains(nome)) {
                        imprimirAluno(a);
                        achou = true;
                    }
                }
                if (!achou) System.out.println("Nenhum aluno encontrado com esse nome.");
            }
            case 4 -> {
                System.out.print("Digite o nome da modalidade (ou parte): ");
                String mod = scanner.nextLine().toLowerCase();
                boolean achou = false;
                for (Aluno a : alunos) {
                    for (Modalidade m : a.modalidades) {
                        if (m.nome.toLowerCase().contains(mod)) {
                            imprimirAluno(a);
                            achou = true;
                            break;
                        }
                    }
                }
                if (!achou) System.out.println("Nenhum aluno encontrado nessa modalidade.");
            }
            default -> System.out.println("Opcao invalida.");
        }
    }

    static void imprimirAluno(Aluno a) {
        System.out.println("\n----------------------------------");
        System.out.println("ID: " + a.id);
        System.out.println("Nome: " + a.nome);
        System.out.println("CPF: " + a.cpf);
        System.out.println("Telefone: " + a.telefone);
        System.out.println("Endereco: " + a.endereco);
        System.out.println("Status: " + a.status);
        System.out.print("Modalidades: ");
        if (a.modalidades.isEmpty()) {
            System.out.println("Nenhuma");
        } else {
            StringBuilder sb = new StringBuilder();
            for (Modalidade m : a.modalidades) sb.append(m.nome).append(", ");
            System.out.println(sb.substring(0, sb.length() - 2));
        }
        System.out.println("Mensalidade total: R$ " + String.format("%.2f", a.totalMensalidades()));
        System.out.println("Historico de pagamentos:");
        if (a.pagamentos.isEmpty()) {
            System.out.println("  Nenhum pagamento registrado.");
        } else {
            for (Pagamento p : a.pagamentos) {
                System.out.println("  - " + p);
            }
        }
    }

    // ---------- 4. EDITAR ALUNO ----------

    static void editarAluno() {
        System.out.print("\nDigite o ID do aluno a editar: ");
        int id = lerOpcaoInt();
        Aluno a = buscarAlunoPorId(id);
        if (a == null) {
            System.out.println("Aluno nao encontrado.");
            return;
        }

        boolean editando = true;
        while (editando) {
            System.out.println("\n--- EDITANDO: " + a.nome + " ---");
            System.out.println(" [1] Nome (atual: " + a.nome + ")");
            System.out.println(" [2] Telefone (atual: " + a.telefone + ")");
            System.out.println(" [3] Endereco (atual: " + a.endereco + ")");
            System.out.println(" [4] Status (atual: " + a.status + ")");
            System.out.println(" [5] Adicionar/gerenciar Modalidades");
            System.out.println(" [0] Voltar ao menu principal");
            System.out.print("Opcao: ");
            int opcao = lerOpcaoInt();

            switch (opcao) {
                case 1 -> {
                    System.out.print("Novo nome: ");
                    a.nome = scanner.nextLine();
                }
                case 2 -> {
                    System.out.print("Novo telefone: ");
                    a.telefone = scanner.nextLine();
                }
                case 3 -> {
                    System.out.print("Novo endereco: ");
                    a.endereco = scanner.nextLine();
                }
                case 4 -> {
                    System.out.print("Novo status (Ativo/Inativo): ");
                    a.status = scanner.nextLine();
                }
                case 5 -> selecionarModalidades(a);
                case 0 -> editando = false;
                default -> System.out.println("Opcao invalida.");
            }
        }
        System.out.println("\nAluno atualizado com sucesso!");
    }

    // ---------- 5. EXCLUIR ALUNO ----------

    static void excluirAluno() {
        System.out.print("\nDigite o ID do aluno a excluir: ");
        int id = lerOpcaoInt();
        Aluno a = buscarAlunoPorId(id);
        if (a == null) {
            System.out.println("Aluno nao encontrado.");
            return;
        }
        System.out.print("Confirma exclusao de \"" + a.nome + "\"? (S/N): ");
        String resp = scanner.nextLine().trim().toUpperCase();
        if (resp.equals("S")) {
            alunos.remove(a);
            System.out.println("Aluno removido com sucesso!");
        } else {
            System.out.println("Operacao cancelada.");
        }
    }

    // ---------- 6. MODALIDADES ----------

    static void exibirModalidades() {
        System.out.println("\n--- MODALIDADES DISPONIVEIS ---");
        for (int i = 0; i < modalidadesDisponiveis.size(); i++) {
            System.out.println(" [" + (i + 1) + "] " + modalidadesDisponiveis.get(i));
        }
    }

    // ---------- 7. REGISTRAR PAGAMENTO ----------

    static void registrarPagamento() {
        System.out.print("\nDigite o ID do aluno: ");
        int id = lerOpcaoInt();
        Aluno a = buscarAlunoPorId(id);
        if (a == null) {
            System.out.println("Aluno nao encontrado.");
            return;
        }

        System.out.print("Valor do pagamento: R$ ");
        double valor = lerOpcaoDouble();

        System.out.println("Forma de pagamento:");
        System.out.println(" [1] PIX");
        System.out.println(" [2] Dinheiro");
        System.out.print("Opcao: ");
        int formaOpcao = lerOpcaoInt();
        String forma = (formaOpcao == 2) ? "Dinheiro" : "PIX";

        Pagamento pagamento = new Pagamento(valor, LocalDate.now(), forma, "Pago");
        a.pagamentos.add(pagamento);
        System.out.println("\nPagamento registrado com sucesso para " + a.nome + "!");
    }

    // ---------- 8. CONTROLE DE VENCIMENTOS ----------

    static void controleDeVencimentos() {
        System.out.println("\n--- CONTROLE DE VENCIMENTOS ---");
        System.out.println("Legenda: [Pago] [Pendente] [Atrasado]\n");

        if (alunos.isEmpty()) {
            System.out.println("Nenhum aluno cadastrado.");
            return;
        }

        for (Aluno a : alunos) {
            String statusGeral = "Pago";
            for (Pagamento p : a.pagamentos) {
                if (p.status.equals("Atrasado")) {
                    statusGeral = "Atrasado";
                    break;
                } else if (p.status.equals("Pendente")) {
                    statusGeral = "Pendente";
                }
            }
            if (a.pagamentos.isEmpty()) statusGeral = "Pendente";

            String emoji = switch (statusGeral) {
                case "Pago" -> "[Pago]";
                case "Pendente" -> "[Pendente]";
                default -> "[Atrasado]";
            };
            System.out.println(a.id + " - " + a.nome + " -> " + emoji);
        }
    }

    // ---------- 9. RELATORIOS ----------

    static void exibirRelatorios() {
        System.out.println("\n--- RELATORIOS ---");

        double totalRecebido = 0, totalPendente = 0, totalAtrasado = 0;
        for (Aluno a : alunos) {
            for (Pagamento p : a.pagamentos) {
                switch (p.status) {
                    case "Pago" -> totalRecebido += p.valor;
                    case "Pendente" -> totalPendente += p.valor;
                    case "Atrasado" -> totalAtrasado += p.valor;
                }
            }
        }

        System.out.println("Total de alunos        : " + alunos.size());
        System.out.println("Total recebido         : R$ " + String.format("%.2f", totalRecebido));
        System.out.println("Total pendente         : R$ " + String.format("%.2f", totalPendente));
        System.out.println("Total em atraso        : R$ " + String.format("%.2f", totalAtrasado));

        System.out.println("\nModalidades mais procuradas:");
        for (Modalidade m : modalidadesDisponiveis) {
            long qtd = alunos.stream().filter(a -> a.modalidades.contains(m)).count();
            if (qtd > 0) {
                System.out.println(" - " + m.nome + ": " + qtd + " aluno(s)");
            }
        }
    }

    // ---------- 10. BANCO DE DADOS (visualizacao das tabelas) ----------

    static void exibirBancoDeDados() {
        System.out.println("\n--- TABELA ALUNO ---");
        System.out.printf("%-4s %-20s %-16s %-10s%n", "ID", "Nome", "CPF", "Status");
        for (Aluno a : alunos) {
            System.out.printf("%-4d %-20s %-16s %-10s%n", a.id, a.nome, a.cpf, a.status);
        }

        System.out.println("\n--- TABELA MODALIDADE ---");
        System.out.printf("%-20s %-12s%n", "Nome", "Valor");
        for (Modalidade m : modalidadesDisponiveis) {
            System.out.printf("%-20s R$ %-8.2f%n", m.nome, m.mensalidade);
        }

        System.out.println("\n--- TABELA PAGAMENTO ---");
        System.out.printf("%-10s %-10s %-12s %-12s %-10s%n", "Aluno ID", "Valor", "Data", "Forma", "Status");
        for (Aluno a : alunos) {
            for (Pagamento p : a.pagamentos) {
                System.out.printf("%-10d R$ %-7.2f %-12s %-12s %-10s%n",
                        a.id, p.valor, p.data, p.formaPagamento, p.status);
            }
        }
    }

    // ---------- 11. SOBRE O SISTEMA ----------

    static void sobreOSistema() {
        System.out.println("\n--- SOBRE O SISTEMA ---");
        System.out.println("Sistema de Gestao Esportiva - Academia Andre Silva");
        System.out.println("Autor: Dimitrius Gabineski");
        System.out.println("Versao: 2.0 (MVP)");
        System.out.println("Contato: Professor Andre Silva - WhatsApp (51) 8474-2517");
        System.out.println("         Professora Marcia Brasil - WhatsApp (51) 8461-0503");
    }

    // ---------- METODOS AUXILIARES ----------

    static Aluno buscarAlunoPorId(int id) {
        for (Aluno a : alunos) {
            if (a.id == id) return a;
        }
        return null;
    }

    static int lerOpcaoInt() {
        while (true) {
            try {
                String linha = scanner.nextLine().trim();
                return Integer.parseInt(linha);
            } catch (NumberFormatException e) {
                System.out.print("Entrada invalida. Digite um numero: ");
            }
        }
    }

    static double lerOpcaoDouble() {
        while (true) {
            try {
                String linha = scanner.nextLine().trim().replace(",", ".");
                return Double.parseDouble(linha);
            } catch (NumberFormatException e) {
                System.out.print("Entrada invalida. Digite um valor numerico: ");
            }
        }
    }
}