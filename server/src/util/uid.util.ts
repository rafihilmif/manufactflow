import { v4 as uuidv4 } from 'uuid';
import { DataSource } from 'typeorm';

export enum UIDType {
  USER = 'USR',
  ROLE = 'ROL',
  DEPARTMENT = 'DPT',
  BRANCH = 'BRH',
}

interface UIDConfig {
  prefix: string;
  length: number;
  tableName: string;
  columnName: string;
}

export function getUIDConfig(uidType: UIDType): UIDConfig {
  const configs: Record<UIDType, UIDConfig> = {
    [UIDType.USER]: {
      prefix: UIDType.USER,
      length: 11,
      tableName: 'users',
      columnName: 'user_id',
    },
    [UIDType.ROLE]: {
      prefix: UIDType.ROLE,
      length: 11,
      tableName: 'roles',
      columnName: 'role_id',
    },
    [UIDType.DEPARTMENT]: {
      prefix: UIDType.DEPARTMENT,
      length: 11,
      tableName: 'departements',
      columnName: 'department_id',
    },
    [UIDType.BRANCH]: {
      prefix: UIDType.BRANCH,
      length: 11,
      tableName: 'branchs',
      columnName: 'branch_id',
    },
  };
  return configs[uidType];
}

export async function generateUniqueUID(uidType: UIDType, dataSource: DataSource): Promise<string> {
  const config = getUIDConfig(uidType);
  return generateUniqueUIDWithConfig(config, dataSource);
}

export async function generateUniqueUIDWithConfig(
  config: UIDConfig,
  dataSource: DataSource,
): Promise<string> {
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const newUID = generateUIDWithConfig(config);

    const query = `SELECT ${config.columnName} FROM ${config.tableName} WHERE ${config.columnName} = $1`;

    try {
      const result = await dataSource.query(query, [newUID]);

      if (result.length === 0) {
        return newUID;
      }
    } catch (error) {
      throw new Error(`Error checking UID uniqueness: ${error.message}`);
    }
  }

  throw new Error(`Failed to generate unique UID after ${maxAttempts} attempts`);
}

function generateUIDWithConfig(config: UIDConfig): string {
  const uid = uuidv4();

  const cleanUID = uid.replace(/-/g, '');

  let length = config.length;
  if (length > cleanUID.length) {
    length = cleanUID.length;
  }

  const shortUID = cleanUID.substring(0, length).toUpperCase();

  return `${config.prefix}-${shortUID}`;
}
