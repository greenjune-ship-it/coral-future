import pandas as pd


def check_unique_ed50_values(df):
    """
    Checks if all ED50 values for individual colony are the same.

    Args:
        df (pandas.DataFrame): Input DataFrame.

    Raises:
        ValueError: If any colony has more than one unique ED50 value.

    Returns:
        None
    """
    for colony, group in df.groupby(
            ['Colony.name', 'Observation.condition', 'Observation.timepoint']):
        unique_values = group['Colony.ed50_value'].nunique()
        if unique_values != 1:
            raise ValueError(
                f"Colony '{colony}' has {unique_values} unique ed50 values. Must be only one.")


def validate_datasheet(df):
    check_unique_ed50_values(df)
