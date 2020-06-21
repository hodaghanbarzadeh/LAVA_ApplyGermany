namespace ImportData.Repository
{
    public interface IRepositoryConfig
    {
        IRepositoryConfig AddCol(string name, DataType Type);
        IRepositoryConfig SetTableName(string name);
    }
}
