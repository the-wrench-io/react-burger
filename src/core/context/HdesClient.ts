declare namespace HdesClient {

    export type TagId = string;
    export type EntityId = string;
    export type AstBodyType = "FLOW" | "FLOW_TASK" | "DT" | "TAG";
    export type ProgramStatus = "UP" | "AST_ERROR" | "PROGRAM_ERROR" | "DEPENDENCY_ERROR";
    export type AstCommandValue = (
        "SET" | "ADD" | "DELETE" | "SET_BODY" |
        "SET_NAME" | "SET_DESCRIPTION" | "IMPORT_CSV" | "IMPORT_ORDERED_CSV" |
        "MOVE_ROW" | "MOVE_HEADER" | "INSERT_ROW" | "COPY_ROW" |
        "SET_HEADER_TYPE" | "SET_HEADER_REF" | "SET_HEADER_NAME" |
        "SET_HEADER_SCRIPT" | "SET_HEADER_DIRECTION" | "SET_HEADER_EXPRESSION" | "SET_HIT_POLICY" | "SET_CELL_VALUE" |
        "DELETE_CELL" | "DELETE_HEADER" | "DELETE_ROW" |
        "ADD_LOG" | "ADD_HEADER_IN" | "ADD_HEADER_OUT" | "ADD_ROW" |
        "SET_VALUE_SET" | "ADD_TO_VALUE_SET" | "DELETE_FROM_VALUE_SET"
    );


    export interface Entity<A extends AstBody> {
        id: EntityId
        ast?: A
        source: AstSource;
        warnings: ProgramMessage[];
        errors: ProgramMessage[];
        associations: ProgramAssociation[];
        status: ProgramStatus;
    }

    export interface AstBody {
        name: string;
        description?: string;
        headers: Headers;
        bodyType: AstBodyType;
    }
    export interface AstSource {
        id: string;
        hash: string;
        bodyType: AstBodyType;
        commands: AstCommand[];
    }
    export interface AstCommand {
        id?: string;
        value?: string;
        type: AstCommandValue;
    }

    export interface ProgramMessage {
        id: string;
        msg: string;
    }
    export interface ProgramAssociation {
        id?: string;
        ref: string;
        refType: AstBodyType;
        refStatus: ProgramStatus;
        owner: string;
    }

    export interface AstTag extends AstBody {
        name: string;
        created: string;
        values: AstTagValue[];
    }
    export interface AstTagValue {
        hash: string;
        bodyType: AstBodyType;
        commands: AstCommand[];
    } 

}

export default HdesClient;
