import { Model, Optional } from 'sequelize'

import { Review } from '../../model/review'

type ReviewCreation = Optional<Review, 'id'>
export interface ReviewOrmModel extends Model<Review, ReviewCreation>, Review {}
