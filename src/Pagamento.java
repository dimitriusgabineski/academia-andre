import java.time.LocalDate;
public class Pagamento {

    private Aluno aluno;

    private double valor;

    private String formaPagamento;

    private LocalDate dataPagamento;

    private StatusPagamento status;

    public Pagamento(Aluno aluno,double valor,String formaPagamento){

        this.aluno=aluno;
        this.valor=valor;
        this.formaPagamento=formaPagamento;
        this.dataPagamento=LocalDate.now();
        this.status=StatusPagamento.PAGO;

    }

    public double getValor(){
        return valor;
    }

}