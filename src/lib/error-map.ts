/* wont be adding zod errors here */
/* better auth errors can be translateError(ctx.error.code) or translateError(ctx.error.message) */

const errorTranslations: Record<string, string> = {
    // better auth errors (code)
    USER_NOT_FOUND: "Usuário não encontrado.",
	FAILED_TO_CREATE_USER: "Falha ao criar usuário.",
	FAILED_TO_UPDATE_USER: "Falha ao atualizar usuário.",
	USER_ALREADY_EXISTS: "Usuário já existe.",
	USER_EMAIL_NOT_FOUND: "Email do usuário não encontrado.",
	USER_ALREADY_HAS_PASSWORD: "Usuário já possui uma senha. Forneça-a para excluir a conta.",
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Usuário já existe. Use outro email.",
	FAILED_TO_CREATE_SESSION: "Falha ao criar sessão.",
	FAILED_TO_GET_SESSION: "Falha ao obter sessão.",
	SESSION_EXPIRED: "Sessão expirada. Autentique-se novamente para realizar esta ação.",
	INVALID_PASSWORD: "Senha inválida.",
	INVALID_EMAIL: "Email inválido.",
	INVALID_EMAIL_OR_PASSWORD: "Email ou senha inválidos.",
	INVALID_TOKEN: "Token inválido.",
	EMAIL_NOT_VERIFIED: "Email não verificado.",
	CREDENTIAL_ACCOUNT_NOT_FOUND: "Conta de credenciais não encontrada.",
	PASSWORD_TOO_SHORT: "Senha muito curta.",
	PASSWORD_TOO_LONG: "Senha muito longa.",
	SOCIAL_ACCOUNT_ALREADY_LINKED: "Conta já vinculada.",
	PROVIDER_NOT_FOUND: "Provedor não encontrado.",
	ID_TOKEN_NOT_SUPPORTED: "id_token não suportado.",
	FAILED_TO_GET_USER_INFO: "Falha ao obter informações do usuário.",
	EMAIL_CAN_NOT_BE_UPDATED: "Email não pode ser atualizado.",
	FAILED_TO_UNLINK_LAST_ACCOUNT: "Você não pode desvincular sua última conta.",
	ACCOUNT_NOT_FOUND: "Conta não encontrada.",

	// better auth errors (message)
	"User already exists. Use another email." : "Usuário já existe. Utilize outro e-mail.",

	// this one is specific for better auth rate limiter 
	"Too many requests. Please try again later." : "Muitas tentativas enviadas. Por favor tente novamente mais tarde.",
	
	// custom better auth.ts instance custom error (code/message)
	THIS_CPF_ALREADY_EXISTS: "Esse CPF já está cadastrado.",
	"This CPF already exists" : "Esse CPF já está cadastrado.",

    // backend status errors (title)
    "VALIDATION_ERROR" : "Erro de validação.",
    "UNAUTHORIZED" : "Acesso negado.",
    "FORBIDDEN" : "Acesso negado.",
    "NOT_FOUND" : "Não encontrado.",
    "CONFLICT" : "Conflito.",
    "TOO_MANY_REQUESTS" : "Muitos pedidos.",
    "INTERNAL_SERVER_ERROR" : "Erro Interno do Servidor.",
    "INVALID_JSON" : "Json inválido.",

    // backend message errors (message, must fill with other errors)
    "Invalid JSON format in request body" : "Formato inválido de JSON no corpo do pedido.",
    "Internal Server Error" : "Erro Interno do Servidor.",
    "A record with this unique field already exists" : "Não foi possível completar a solicitação.", /* not translating these */
    "Foreign Key constraint failed, a related record was not found or cannot be deleted" : "Não foi possível completar a solicitação.",
    "The requested resource could not be found" : "Não foi possível completar a solicitação.",

	// pets
	"Maximun pet per user limit reached" : "Limite máximo de pets por usuário antigido.",
	"Pet not found" : "Pet não encontrado.",
	"You are not allowed to update this pet" : "Você não tem permissão para alterar esse pet.",
	"You are not allowed to delete this pet" : "Você não tem permissão para deletar esse pet.",
	"Cannot delete pet with upcoming appointments. Please cancel them first." : "Não é possível deletar pets com agendamentos marcados. Por favor cancele-os primeiro.",

	    // appointments
    "You have too many pending appointments. Please wait for confirmation or cancel some" :
        "Você possui muitos agendamentos pendentes. Aguarde a confirmação ou cancele alguns.",

    "This pet already has an appointment at this time." :
        "Este pet já possui um agendamento neste horário.",

    "Professional not found" :
        "Profissional não encontrado.",

    "This professional only performs bath and grooming services." :
        "Este profissional realiza apenas serviços de banho e tosa.",

    "This professional cannot perform bath and grooming services." :
        "Este profissional não pode realizar serviços de banho e tosa.",

    "Appointment not found" :
        "Agendamento não encontrado.",

    "Appointments can only be cancelled at least ${CANCEL_APPOINTMENT_TIME_LIMIT} hours in advance" :
        "Os agendamentos só podem ser cancelados com pelo menos ${CANCEL_APPOINTMENT_TIME_LIMIT} horas de antecedência.",

    "This appointment is already confirmed. Contact the clinic to cancel it" :
        "Este agendamento já foi confirmado. Entre em contato com a clínica para cancelá-lo.",

    "This appointment cannot be cancelled anymore" :
        "Este agendamento não pode mais ser cancelado.",

    "Only cancelled appointments can be deleted" :
        "Apenas agendamentos cancelados podem ser excluídos.",

    // route access / auth
    "You are not allowed to access this route" :
        "Você não tem permissão para acessar esta rota.",

    "Forbbiden" :
        "Acesso negado.",

    // professionals
    "You are not allowed to create Professionals" :
        "Você não tem permissão para criar profissionais.",

    "You are not allowed to update Professionals" :
        "Você não tem permissão para atualizar profissionais.",

    "You are not allowed to delete Professionals" :
        "Você não tem permissão para excluir profissionais."
};

export const translateError = (text: string): string => {
    return errorTranslations[text]  || "Error desconhecido: " + text;
}