import java.util.ArrayList;
public class Academia {

    private ArrayList<Aluno> alunos = new ArrayList<>();
    private ArrayList<Professor> professores = new ArrayList<>();
    private ArrayList<Pagamento> pagamentos = new ArrayList<>();

    public void cadastrarAluno(Aluno aluno){
        alunos.add(aluno);
    }

    public void cadastrarProfessor(Professor professor){
        professores.add(professor);
    }

    public void registrarPagamento(Pagamento pagamento){
        pagamentos.add(pagamento);
    }

    public void dashboard(){

        System.out.println("======== DASHBOARD ========");

        System.out.println("Alunos: " + alunos.size());

        System.out.println("Professores: " + professores.size());

        System.out.println("Pagamentos: " + pagamentos.size());

        double total = 0;

        for(Pagamento p : pagamentos){
            total += p.getValor();
        }

        System.out.println("Total Recebido: R$ " + total);

    }

}