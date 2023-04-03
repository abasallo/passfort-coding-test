import { Model, Optional } from 'sequelize'

import { Document } from '../../model/document'

type DocumentCreation = Optional<Document, 'id'>
export interface DocumentOrmModel extends Model<Document, DocumentCreation>, Document {}
