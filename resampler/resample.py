import pandas as pd
import numpy as np
import glob
import os

DURATION_MS = 15000
RATE_MS = 20
INDEX_LABEL = 'timestamp'


def main():
    paths_in = (glob.glob("in/*"))

    for path_in in paths_in:
        file_name = os.path.basename(path_in)
        df = resample(path_in)
        df.to_csv(f'out/resampled_{RATE_MS}_{file_name}', index_label=INDEX_LABEL)


def resample(path_in: str) -> pd.DataFrame:
    df = pd.read_csv(path_in, index_col=0)
    df.index = df.index - df.index[0]

    index_resampled = np.arange(0, DURATION_MS, RATE_MS)
    df = df.reindex(df.index.union(index_resampled)).interpolate().loc[index_resampled]

    return df


if __name__ == "__main__":
    main()
