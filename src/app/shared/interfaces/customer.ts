import { User } from "./user";

export interface Customer {

    user?: User;
    cnpj?: string;
    responsavel_nome?: string;
 	responsavel_telefone?: string;
 	responsavel_celular?: string;
 	responsavel_email?: string;
 	responsavel2_nome?: string;
 	responsavel2_telefone?: string;
 	responsavel2_celular?: string;
    responsavel2_email?: string;
    fk_id_pais?: string;
	fk_id_estado?: string;
	fk_id_regiao?: string;
	fk_id_cidade?: string;
	fk_id_bairro?: string;
	fk_id_logradouro?: string;
    numero?: string;
    complemento_endereco?: string;
    valor_cliente_parecer?: string;
    valor_fornecedor_parecer?: string;
    valor_cliente_negociacao?: string;
    valor_proposto_negociacao?: string;
    valor_negociado_negociacao?: string;
    valor_negociadoC_negociacao?: string; 
	logo?: string;
    data_expiracao?: string;
    

}
