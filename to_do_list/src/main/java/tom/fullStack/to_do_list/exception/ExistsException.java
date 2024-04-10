package tom.fullStack.to_do_list.exception;

public class ExistsException extends RuntimeException{
    public ExistsException(String message) {
        super(message);
    }
}
