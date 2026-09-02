public class Aluno {
    private int id;
    private String nome;
    private String cpf;
    private String telefone;
    private String endereco;

    private Modalidade modalidade;

    private Plano plano;

    private StatusAluno status;

    public Aluno(int id, String nome, String cpf,
                 String telefone, String endereco,
                 Modalidade modalidade,
                 Plano plano){

        this.id=id;
        this.nome=nome;
        this.cpf=cpf;
        this.telefone=telefone;
        this.endereco=endereco;
        this.modalidade=modalidade;
        this.plano=plano;
        this.status=StatusAluno.ATIVO;

    }

    public String getNome(){
        return nome;
    }

}