import mongoose, { Document, Schema } from 'mongoose';

export interface Course extends Document {
  id: string;
  title: string;
  instructor: string;
  enrolled: number;
  status: 'Active' | 'Pending Approval';
}

const CourseSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  enrolled: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Pending Approval'], default: 'Pending Approval' },
});

export default mongoose.models.Course || mongoose.model<Course>('Course', CourseSchema);
