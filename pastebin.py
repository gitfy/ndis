import pyarrow as pa

answer_struct_type = pa.struct([
    pa.field('question_name', pa.string()),
    pa.field('value', pa.struct([
        pa.field('string_value', pa.string()),
        pa.field('numeric_value', pa.float64()),
        pa.field('boolean_value', pa.bool_()),
        pa.field('date_value', pa.date32()),
        pa.field('multiple_choice_values', pa.list_(pa.string()))
    ]))
])

schema = pa.schema([
    pa.field('survey_id', pa.string()),
    pa.field('submission_id', pa.string()),
    pa.field('submission_timestamp', pa.timestamp('ms', tz='UTC')),
    pa.field('answers', pa.list_(answer_struct_type))
])
